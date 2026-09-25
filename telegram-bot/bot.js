/**
 * Standalone Telegram Bot for VELA LABEL Boutique
 * Uses long-polling (No webhook or public IP needed!)
 * 
 * Run with: node bot.js
 * Requires: Node.js 18+ (uses native fetch)
 */

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || 'YOUR_BOT_TOKEN_HERE';
const ADMIN_CHAT_ID = process.env.TELEGRAM_ADMIN_CHAT_ID || 'YOUR_ADMIN_CHAT_ID_HERE';

if (BOT_TOKEN === 'YOUR_BOT_TOKEN_HERE') {
  console.error('Error: Please set TELEGRAM_BOT_TOKEN environment variable or replace in file.');
  process.exit(1);
}

const tgUrl = (method) => `https://api.telegram.org/bot${BOT_TOKEN}/${method}`;

async function apiCall(method, body) {
  const res = await fetch(tgUrl(method), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return res.json();
}

let offset = 0;

async function pollUpdates() {
  try {
    const data = await apiCall('getUpdates', { offset, timeout: 30 });
    if (data.ok && data.result.length > 0) {
      for (const update of data.result) {
        offset = update.update_id + 1;
        await handleUpdate(update);
      }
    }
  } catch (err) {
    console.error('Polling error:', err.message);
    await new Promise((r) => setTimeout(r, 3000));
  }
  setImmediate(pollUpdates);
}

async function handleUpdate(update) {
  // Callback queries (Admin approvals)
  if (update.callback_query) {
    const cq = update.callback_query;
    const data = cq.data || '';

    if (data.startsWith('approve_')) {
      const [, customerChatId, orderId] = data.split('_');

      await apiCall('sendMessage', {
        chat_id: customerChatId,
        parse_mode: 'HTML',
        text: `✦ <b>فیش واریزی شما تایید گردید</b> ✦\n\n` +
          `بانوی گرامی، سفارش شما با کد <code>#${orderId}</code> تایید شد.\n` +
          `📦 <b>وضعیت:</b> در حال آماده‌سازی و ارسال بیمه‌شده مزونی\n` +
          `📍 مشاور اختصاصی مزون به‌زودی جهت هماهنگی با شما تماس خواهد گرفت.\n\n` +
          `با سپاس از انتخاب <b>VELA LABEL</b> ✦`,
      });

      await apiCall('editMessageCaption', {
        chat_id: ADMIN_CHAT_ID,
        message_id: cq.message.message_id,
        parse_mode: 'HTML',
        caption: `${cq.message.caption || ''}\n\n<b>✅ سفارش #${orderId} توسط ادمین تایید و فاکتور صادر شد.</b>`,
      });

      await apiCall('answerCallbackQuery', {
        callback_query_id: cq.id,
        text: 'سفارش تایید شد ✅',
      });
    } else if (data.startsWith('reject_')) {
      const [, customerChatId, orderId] = data.split('_');

      await apiCall('sendMessage', {
        chat_id: customerChatId,
        parse_mode: 'HTML',
        text: `⚠️ <b>عدم تایید فیش سفارش #${orderId}</b>\n\n` +
          `تصویر ارسالی به عنوان فیش واریز مورد تایید قرار نگرفت.\n` +
          `لطفاً رسید معتبر را در همین صفحه ارسال فرمایید.`,
      });

      await apiCall('editMessageCaption', {
        chat_id: ADMIN_CHAT_ID,
        message_id: cq.message.message_id,
        parse_mode: 'HTML',
        caption: `${cq.message.caption || ''}\n\n<b>❌ فیش توسط ادمین رد شد.</b>`,
      });

      await apiCall('answerCallbackQuery', {
        callback_query_id: cq.id,
        text: 'فیش رد شد ❌',
      });
    }
  }

  // Customer messages
  if (update.message) {
    const msg = update.message;
    const chatId = msg.chat.id;
    const text = msg.text || '';

    if (text.startsWith('/start')) {
      const orderCode = 'VELA-' + Math.floor(1000 + Math.random() * 9000);
      await apiCall('sendMessage', {
        chat_id: chatId,
        parse_mode: 'HTML',
        text: `✦ <b>به ربات رسمی مزون VELA LABEL خوش آمدید</b> ✦\n\n` +
          `کد پیگیری سفارش شما: <code>#${orderCode}</code>\n\n` +
          `💳 <b>شماره کارت مزون:</b> <code>۶۰۳۷-۹۹۷۹-۴۵۸۲-۱۲۰۴</code> (بانک سامان)\n` +
          `به نام: ولا لیبل (VELA LABEL)\n\n` +
          `📸 لطفاً <b>عکس فیش واریز کارت‌به‌کارت</b> خود را در همین چت ارسال فرمایید تا سفارش شما ثبت نهایی گردد.`,
      });
      return;
    }

    if (msg.photo && msg.photo.length > 0) {
      const photoFileId = msg.photo[msg.photo.length - 1].file_id;
      const customerName = [msg.from.first_name, msg.from.last_name].filter(Boolean).join(' ');
      const username = msg.from.username ? `@${msg.from.username}` : 'ندارد';
      const orderId = 'VELA-' + Math.floor(1000 + Math.random() * 9000);

      await apiCall('sendPhoto', {
        chat_id: ADMIN_CHAT_ID,
        photo: photoFileId,
        parse_mode: 'HTML',
        caption: `🛍 <b>رسید واریز جدید دریافت شد!</b>\n\n` +
          `کد سفارش: <code>#${orderId}</code>\n` +
          `👤 خریدار: <b>${customerName}</b> (${username})\n` +
          `🆔 شناسه تلگرام: <code>${chatId}</code>\n` +
          `توضیحات: ${msg.caption || 'بدون توضیح'}\n\n` +
          `جهت بررسی و ثبت در سامانه دکمه زیر را انتخاب نمایید:`,
        reply_markup: {
          inline_keyboard: [
            [
              { text: '✅ تایید فیش و ثبت نهایی', callback_data: `approve_${chatId}_${orderId}` },
              { text: '❌ فیش نامعتبر / رد', callback_data: `reject_${chatId}_${orderId}` },
            ],
          ],
        },
      });

      await apiCall('sendMessage', {
        chat_id: chatId,
        parse_mode: 'HTML',
        text: `✅ <b>فیش واریز شما دریافت شد!</b>\n\n` +
          `کد سفارش: <code>#${orderId}</code>\n` +
          `رسید شما به واحد مالی مزون تحویل داده شد. پس از تایید، پیام تاییدیه نهایی برای شما ارسال خواهد شد.`,
      });
      return;
    }

    await apiCall('sendMessage', {
      chat_id: chatId,
      parse_mode: 'HTML',
      text: `درود بر شما ✦\nجهت ثبت نهایی سفارش، لطفاً <b>تصویر فیش واریز کارت‌به‌کارت</b> خود را ارسال فرمایید.`,
    });
  }
}

console.log('VELA LABEL Boutique Bot is running...');
pollUpdates();
