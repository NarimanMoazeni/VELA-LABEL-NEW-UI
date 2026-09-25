/**
 * Cloudflare Pages Function: /api/telegram
 * Serverless Telegram Webhook handler for VELA LABEL Boutique Bot
 * 
 * Environment Variables required in Cloudflare Pages Dashboard:
 * - TELEGRAM_BOT_TOKEN: Bot token obtained from @BotFather
 * - TELEGRAM_ADMIN_CHAT_ID: Admin's personal Telegram chat ID or channel ID
 */

export async function onRequestPost(context) {
  const { request, env } = context;
  const botToken = env.TELEGRAM_BOT_TOKEN;
  const adminChatId = env.TELEGRAM_ADMIN_CHAT_ID;

  if (!botToken || !adminChatId) {
    return new Response(JSON.stringify({ error: 'Missing environment variables' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let update;
  try {
    update = await request.json();
  } catch (err) {
    return new Response('Invalid JSON', { status: 400 });
  }

  const tgUrl = (method) => `https://api.telegram.org/bot${botToken}/${method}`;

  // Helper: Send text message
  async function sendMessage(chatId, text, replyMarkup = null) {
    const payload = {
      chat_id: chatId,
      text: text,
      parse_mode: 'HTML',
    };
    if (replyMarkup) payload.reply_markup = replyMarkup;

    await fetch(tgUrl('sendMessage'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  }

  // Helper: Forward photo with caption and inline buttons to Admin
  async function sendPhotoToAdmin(photoFileId, caption, callbackDataApprove, callbackDataReject) {
    const payload = {
      chat_id: adminChatId,
      photo: photoFileId,
      caption: caption,
      parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: [
          [
            { text: '✅ تایید فیش و ثبت نهایی', callback_data: callbackDataApprove },
            { text: '❌ فیش نامعتبر / رد', callback_data: callbackDataReject },
          ],
        ],
      },
    };

    await fetch(tgUrl('sendPhoto'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  }

  // 1. Handle Callback Query (Admin clicking Approve / Reject)
  if (update.callback_query) {
    const cq = update.callback_query;
    const data = cq.data || '';
    const adminMessageId = cq.message?.message_id;

    if (data.startsWith('approve_')) {
      const parts = data.split('_');
      const customerChatId = parts[1];
      const orderId = parts[2] || 'اختصاصی';

      // Notify Customer
      const invoiceText = `✦ <b>فیش واریزی شما تایید گردید</b> ✦\n\n` +
        `بانوی گرامی، پرداخت شما برای سفارش <code>#${orderId}</code> با موفقیت تایید شد.\n\n` +
        `📦 <b>وضعیت:</b> در حال آماده‌سازی و ارسال بیمه‌شده مزونی\n` +
        `📍 کانسیرژ مزون جهت هماهنگی بازه ارسال به‌زودی با شما تماس خواهد گرفت.\n\n` +
        `با سپاس از انتخاب و همراهی شما با <b>VELA LABEL</b> ✦`;

      await sendMessage(customerChatId, invoiceText);

      // Edit Admin Message
      await fetch(tgUrl('editMessageCaption'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: adminChatId,
          message_id: adminMessageId,
          caption: `${cq.message.caption || ''}\n\n<b>✅ سفارش #${orderId} توسط ادمین تایید و فاکتور صادر گردید.</b>`,
          parse_mode: 'HTML',
        }),
      });

      // Answer Callback
      await fetch(tgUrl('answerCallbackQuery'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ callback_query_id: cq.id, text: 'سفارش تایید شد ✅' }),
      });
    } else if (data.startsWith('reject_')) {
      const parts = data.split('_');
      const customerChatId = parts[1];
      const orderId = parts[2] || 'اختصاصی';

      // Notify Customer
      const rejectText = `⚠️ <b>عدم تایید فیش سفارش #${orderId}</b>\n\n` +
        `تصویر ارسالی به عنوان فیش واریز قابل تایید نبود (ناخوانا بودن، مغایرت مبلغ یا عدم انتقال وجه).\n\n` +
        `لطفاً تصویر رسید معتبر و نهایی را در همین چت ارسال نمایید یا با پشتیبانی در ارتباط باشید.`;

      await sendMessage(customerChatId, rejectText);

      // Edit Admin Message
      await fetch(tgUrl('editMessageCaption'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: adminChatId,
          message_id: adminMessageId,
          caption: `${cq.message.caption || ''}\n\n<b>❌ این فیش توسط ادمین رد شد.</b>`,
          parse_mode: 'HTML',
        }),
      });

      await fetch(tgUrl('answerCallbackQuery'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ callback_query_id: cq.id, text: 'فیش رد شد ❌' }),
      });
    }

    return new Response('OK');
  }

  // 2. Handle Messages from Customer
  if (update.message) {
    const msg = update.message;
    const chatId = msg.chat.id;
    const text = msg.text || '';

    // A. Start Command (Customer arrived from Website)
    if (text.startsWith('/start')) {
      const orderCode = 'VELA-' + Math.floor(1000 + Math.random() * 9000);
      const welcome = `✦ <b>به ربات رسمی مزون VELA LABEL خوش آمدید</b> ✦\n\n` +
        `کد پیگیری سفارش شما: <code>#${orderCode}</code>\n\n` +
        `💳 <b>شماره کارت مزون:</b> <code>۶۰۳۷-۹۹۷۹-۴۵۸۲-۱۲۰۴</code> (بانک سامان)\n` +
        `به نام: ولا لیبل (VELA LABEL)\n\n` +
        `📸 <b>مرحله بعد:</b> لطفاً <b>عکس فیش واریز کارت‌به‌کارت</b> خود را در همین صفحه ارسال فرمایید تا سفارش شما بررسی و فاکتور نهایی صادر شود.`;

      await sendMessage(chatId, welcome);
      return new Response('OK');
    }

    // B. Customer Uploads Receipt Photo
    if (msg.photo && msg.photo.length > 0) {
      // Get highest resolution photo
      const photoFileId = msg.photo[msg.photo.length - 1].file_id;
      const customerName = [msg.from.first_name, msg.from.last_name].filter(Boolean).join(' ');
      const username = msg.from.username ? `@${msg.from.username}` : 'ندارد';
      const orderId = 'VELA-' + Math.floor(1000 + Math.random() * 9000);

      const adminCaption = `🛍 <b>رسید واریز جدید دریافت شد!</b>\n\n` +
        `کد سفارش: <code>#${orderId}</code>\n` +
        `👤 خریدار: <b>${customerName}</b> (${username})\n` +
        `🆔 شناسه عددی تلگرام: <code>${chatId}</code>\n` +
        `توضیحات همراه: ${msg.caption || 'بدون توضیح'}\n\n` +
        `جهت بررسی و ثبت در سامانه دکمه زیر را انتخاب نمایید:`;

      await sendPhotoToAdmin(
        photoFileId,
        adminCaption,
        `approve_${chatId}_${orderId}`,
        `reject_${chatId}_${orderId}`
      );

      // Confirm to customer
      await sendMessage(
        chatId,
        `✅ <b>فیش واریز شما با موفقیت دریافت شد!</b>\n\n` +
        `کد سفارش شما: <code>#${orderId}</code>\n` +
        `رسید شما برای کارشناس مالی مزون ارسال گردید. پس از بررسی و تایید، فاکتور نهایی و جزئیات ارسال برای شما ارسال خواهد شد.`
      );

      return new Response('OK');
    }

    // C. Regular text / support
    await sendMessage(
      chatId,
      `درود بر شما ✦\nجهت تایید سفارش، لطفاً <b>تصویر فیش واریز کارت‌به‌کارت</b> را ارسال بفرمایید یا جهت ارتباط مستقیم با آیدی @velalabel در ارتباط باشید.`
    );
  }

  return new Response('OK');
}
