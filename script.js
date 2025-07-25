// =================================================================
// SECTION 1: GAME DATA
// All your data arrays are defined here.
// =================================================================

const classicGames = [
  { name: 'Правда или действие', minPlayers: 2, maxPlayers: 20, rules: 'Выбирай: честно ответь на вопрос или выполни задание. Классика для весёлых компаний!', detailedRules: 'Игроки садятся в круг. По очереди каждый выбирает другого участника и спрашивает: "Правда или действие?" При выборе "правда" нужно честно ответить на любой вопрос. При выборе "действие" - выполнить задание (например, спеть песню или станцевать). Отказываться нельзя! Игра продолжается, пока не надоест.' },
  { name: 'Крокодил', minPlayers: 3, maxPlayers: 20, rules: 'Объясняй слова жестами без слов. Кто угадает - становится следующим ведущим!', detailedRules: 'Один игрок загадывает слово (можно выбрать тему) и объясняет его только жестами, без слов и звуков. Остальные угадывают. Первый, кто назовёт правильный ответ, загадывает следующее слово. Можно использовать таймер (1-2 минуты на слово).' },
  { name: 'Контакт', minPlayers: 4, maxPlayers: 20, rules: 'Угадай загаданное слово по буквам через вопросы. Развивает логику и смекалку!', detailedRules: 'Ведущий загадывает слово и называет первую букву. Остальные задают вопросы, на которые можно ответить только "да" или "нет". Если кто-то догадывается, он говорит "Контакт!" и вместе с другим догадавшимся считает до 3 и называет слово. Если совпали - ведущий открывает следующую букву.' },
  { name: 'Шляпа', minPlayers: 4, maxPlayers: 16, rules: 'Объясняй слова из шляпы за ограниченное время. Командная игра на объяснение слов!', detailedRules: 'Подготовьте слова (по 5-7 на игрока) и сложите в шляпу. Разделитесь на команды. По очереди игроки вытягивают слова и объясняют их своей команде (без однокоренных слов). На раунд даётся 30-60 секунд. Побеждает команда, угадавшая больше слов.' },
  { name: 'Испорченный телефон', minPlayers: 4, maxPlayers: 20, rules: 'Передай фразу по цепочке шёпотом - посмотрим, что получится в конце!', detailedRules: 'Игроки садятся в ряд. Первый придумывает фразу и шёпотом говорит её следующему. Тот передаёт дальше. Последний игрок произносит вслух, что услышал. Обычно результат сильно отличается от оригинала - отсюда и смех!' },
  { name: 'Кто я?', minPlayers: 2, maxPlayers: 20, rules: 'Загадай персонажа, остальные задают вопросы, чтобы угадать. Иногда ты — лампочка.', detailedRules: 'Игроки садятся в круг. Ведущий загадывает персонажа. Первый игрок задаёт вопросы, чтобы угадать. Следующий должен угадать. Если угадал — становится ведущим. Если не угадал — выполняет задание.' },
  { name: 'Я никогда не...', minPlayers: 3, maxPlayers: 20, rules: 'Говори то, чего никогда не делал. Если кто-то делал — рассказывает подробности!', detailedRules: 'Игроки садятся в круг. Ведущий начинает: "Я никогда не — (что-то, что вы не делали). Если кто-то делал — рассказывает подробности." Остальные должны сказать то, чего они никогда не делали. Если кто-то делал — рассказывает подробности.' },
  { name: 'Объясни слово', minPlayers: 2, maxPlayers: 20, rules: 'Объясняй слова, не используя однокоренные. Кто угадает — тот молодец!', detailedRules: 'Игроки садятся в круг. Ведущий загадывает слово. Первый игрок объясняет слово, не используя однокоренные. Следующий должен угадать слово. Если угадал — становится ведущим. Если не угадал — выполняет задание. Игра продолжается по кругу.' },
  // Add more classic games from your original list if you wish
];

const crocodileWords = [ 'пылесос', 'йога', 'космонавт', 'пожарный', 'балерина', 'слон', 'гитара', 'пицца', 'самолёт', 'пловец', 'учитель', 'пингвин', 'библиотека', 'паровоз', 'футболист', 'скейтборд', 'петух', 'компьютер', 'арбуз', 'собака', 'пожарная машина', 'велосипед', 'певец', 'пекарь', 'медведь', 'пароход', 'пилот', 'рыбак', 'пчела', 'петрушка', 'дирижёр', 'зоопарк', 'музей', 'театр', 'врач', 'программист', 'строитель', 'водитель', 'спортсмен', 'стол', 'стул', 'книга', 'телефон', 'чайник', 'карандаш', 'зонт', 'куртка', 'очки', 'собака', 'кошка', 'попугай', 'лошадь', 'тигр', 'лев', 'жираф', 'белка' ];
const hatWords = [ 'арбуз', 'балет', 'барабан', 'библиотека', 'билет', 'бокал', 'больница', 'бутылка', 'ваза', 'велосипед', 'вертолёт', 'ветер', 'вилка', 'виноград', 'вода', 'воробей', 'газета', 'гитара', 'глобус', 'город', 'гриб', 'грузовик', 'дача', 'дворец', 'диван', 'дождь', 'дом', 'доска', 'дракон', 'друг', 'еж', 'жираф', 'жук', 'завод', 'заяц', 'зебра', 'зеркало', 'зонт', 'игра', 'игрушка', 'книга', 'компьютер' ];
const explainWords = [ 'балкон', 'библиотека', 'дворец', 'завод', 'инструмент', 'кактус', 'корабль', 'лампа', 'мост', 'музей', 'облако', 'остров', 'планета', 'пылесос', 'ракета', 'река', 'самолёт', 'спектакль', 'танк', 'театр', 'телевизор', 'трактор', 'университет', 'фотоаппарат', 'цирк', 'чемодан', 'школа', 'энциклопедия', 'якорь' ];

const aiGames = [
  { name: 'СмехоБаттл', rules: 'Два игрока по очереди рассказывают самые нелепые шутки. Кто засмеётся первым — проиграл!' },
  { name: 'Звуковой Хаос', rules: 'Один игрок изображает любой звук (животное, техника, природа), остальные угадывают. Кто угадал — следующий!' },
  { name: 'Мини-Диктор', rules: 'Каждый по очереди озвучивает новости дня в стиле комедии или фантастики. Чем абсурднее — тем лучше!' },
  { name: 'Путаница слов', rules: 'Игроки по очереди говорят слова, не связанные друг с другом. Кто случайно свяжет — рассказывает анекдот!' },
  { name: 'Театр эмоций', rules: 'Один игрок изображает эмоцию, остальные угадывают. Иногда эмоция — “я увидел огромную пиццу”.' },
  { name: 'Сказка на лету', rules: 'Один начинает рассказывать сказку, каждый следующий добавляет по предложению. Чем нелепее — тем веселее!' },
  { name: 'Рифмопад', rules: 'Придумайте рифму к слову соседа. Кто не смог — рассказывает стихотворение!' },
  { name: 'Голос из будущего', rules: 'Один говорит фразу, как будто он робот из будущего. Остальные угадывают, что это за фраза.' },
  { name: 'Секретный комплимент', rules: 'Каждый по очереди говорит комплимент, но с необычным словом (например, “ты как солнечный холодильник!”).' },
  { name: 'Вопрос наоборот', rules: 'На любой вопрос можно отвечать только вопросом. Кто ошибётся — поёт песню!' }
];


// =================================================================
// SECTION 2: HELPER FUNCTIONS
// All the functions that perform actions are defined here.
// =================================================================

/**
 * Sends game data to the Telegram bot via the Flask API.
 */
function sendGameToBot(gameName, messages) {
  console.log('✅ INSIDE sendGameToBot. Preparing to fetch.', { gameName, messages });
  const apiUrl = 'http://localhost:8080/send_game';

  fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ game_name: gameName, messages: messages })
  })
  .then(response => {
    console.log(`↔️ FETCH response received. Status: ${response.status}`);
    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
    }
    return response.json();
  })
  .then(data => {
    console.log('✅ Server response data:', data);
  })
  .catch(error => {
    console.error('❌ FETCH ERROR:', error);
    alert('Не удалось связаться с сервером. Проверьте, запущен ли он, и посмотрите в консоль F12 для деталей.');
  });
}

/**
 * Returns a specified number of random items from an array.
 */
function getRandomWords(arr, count) {
  const shuffled = arr.slice().sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

/**
 * Reads the selected player count from the dropdown.
 * Returns NaN if "Любое" is selected.
 */
function getPlayerCount() {
    const selector = document.getElementById('playerCount');
    const value = parseInt(selector.value, 10);
    return isNaN(value) ? NaN : value;
}

/**
 * Displays extra action buttons (like "Раздать слова") for specific games.
 */
function showExtraContent(gameName) {
    const extraDiv = document.getElementById('extra-content');
    extraDiv.innerHTML = ''; // Clear previous buttons

    const playerCount = getPlayerCount() || 4; // Default to 4 if user selects "Any"
    let buttonText = '';
    let wordsArray = [];
    let gameTitle = '';
    let needsWords = false;

    if (gameName === 'Крокодил') {
        buttonText = 'Раздать слова для Крокодила';
        wordsArray = crocodileWords;
        gameTitle = 'Крокодил';
        needsWords = true;
    } else if (gameName === 'Шляпа') {
        buttonText = 'Раздать слова для Шляпы';
        wordsArray = hatWords;
        gameTitle = 'Шляпа';
        needsWords = true;
    } else if (gameName === 'Объясни слово') {
        buttonText = 'Раздать слова для Объяснения';
        wordsArray = explainWords;
        gameTitle = 'Объясни слово';
        needsWords = true;
    }

    if (needsWords) {
        const btn = document.createElement('button');
        btn.className = 'neon-btn-green';
        btn.textContent = buttonText;
        btn.onclick = () => {
            const words = getRandomWords(wordsArray, playerCount);
            // Включить правила и индивидуальное слово в каждое сообщение
            const rules = (classicGames.find(g => g.name === gameTitle) || {}).rules || '';
            const messages = words.map(w => `Игра: <b>${gameTitle}</b>\n${rules}\nТебе слово: <b>${w}</b>`);
            sendGameToBot(gameTitle, messages);
            btn.textContent = 'Слова отправлены!';
            btn.disabled = true;
        };
        extraDiv.appendChild(btn);
    }
}

/**
 * Generates and displays a classic game, then announces it in Telegram.
 */
function generateClassic() {
    console.log("--- generateClassic called ---");
    const playerCount = getPlayerCount();

    let filteredGames = classicGames;
    if (!isNaN(playerCount)) {
        filteredGames = classicGames.filter(g => playerCount >= g.minPlayers && playerCount <= g.maxPlayers);
    }

    const resultDiv = document.getElementById('result');
    if (filteredGames.length === 0) {
        resultDiv.textContent = 'Нет подходящих игр для такого количества игроков!';
        document.getElementById('extra-content').innerHTML = '';
        return;
    }

    const game = filteredGames[Math.floor(Math.random() * filteredGames.length)];
    // Определяем, нужна ли кнопка для слов
    const needsWords = (game.name === 'Крокодил' || game.name === 'Шляпа' || game.name === 'Объясни слово');
    let html = `<div class="neon-game-name">${game.name}</div><div style="margin-top:0.7em;">${game.detailedRules || game.rules}</div>`;
    resultDiv.innerHTML = html;
    // Если нужны слова — добавляем кнопку прямо сюда
    if (needsWords) {
        // Create a flex row for text and icon
        const row = document.createElement('div');
        row.style.display = 'flex';
        row.style.alignItems = 'center';
        row.style.justifyContent = 'center';
        row.style.gap = '1.2em';
        row.style.margin = '0';
        row.style.marginTop = '0.7em';

        // Text
        const info = document.createElement('span');
        info.textContent = 'Пока ты думаешь, наша змея уже придумала слова — переходи в Telegram-бот!';
        info.style.fontSize = '1.15rem';
        info.style.color = '#111';
        info.style.fontFamily = 'Colibri, Arial, sans-serif';
        row.appendChild(info);

        // Telegram icon (SVG in <a>)
        const iconBtn = document.createElement('button');
        iconBtn.type = 'button';
        iconBtn.style.background = 'none';
        iconBtn.style.border = 'none';
        iconBtn.style.padding = '0';
        iconBtn.style.marginLeft = '-25px';
        iconBtn.style.cursor = 'pointer';
        iconBtn.title = 'Раздать слова игрокам';
        iconBtn.innerHTML = `
          <svg width="28" height="28" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:block;">
            <circle cx="35" cy="35" r="33" fill="#229ED9" stroke="#229ED9" stroke-width="4"/>
            <polygon points="10,36 62,18 40,58 40,41 54,28 34,46" fill="#fff" stroke="#fff" stroke-width="2.3"/>
            <polygon points="40,58 46,64 47,48" fill="#fff" stroke="#fff" stroke-width="1.8"/>
          </svg>
        `;
        iconBtn.onclick = () => {
            window.open('https://t.me/partyfunzabava_bot?start=givewords', '_blank');
        };
        row.appendChild(iconBtn);

        resultDiv.appendChild(row);
        // QR code below the helper row
        const qrWrap = document.createElement('div');
        qrWrap.style.display = 'flex';
        qrWrap.style.justifyContent = 'center';
        qrWrap.style.marginTop = '10px';
        qrWrap.style.width = '100%';
        const qrBox = document.createElement('div');
        qrBox.style.display = 'inline-block';
        qrBox.style.padding = '0';
        qrBox.style.borderRadius = '0';
        qrBox.style.background = 'none';
        const qrCanvas = document.createElement('canvas');
        qrCanvas.id = 'tg-bot-qr-dynamic';
        qrCanvas.width = 108;
        qrCanvas.height = 108;
        qrBox.appendChild(qrCanvas);
        qrWrap.appendChild(qrBox);
        resultDiv.appendChild(qrWrap);
        // Generate QR code
        setTimeout(() => {
          new QRious({
            element: document.getElementById('tg-bot-qr-dynamic'),
            value: 'https://t.me/partyfunzabava_bot',
            size: 108,
            background: '#FFFEF7',
            foreground: '#FF9100',
            level: 'H'
          });
        }, 0);
    }
    // Не показываем никаких кнопок в extra-content
    document.getElementById('extra-content').innerHTML = '';
}

/**
 * Generates and displays an AI-powered game suggestion, then announces it in Telegram.
 */
function generateAI() {
    console.log("--- generateAI called ---");
    const game = aiGames[Math.floor(Math.random() * aiGames.length)];
    document.getElementById('result').innerHTML = `<div class="neon-game-name">${game.name}</div><div style="margin-top:0.7em;">${game.rules}</div>`;
    document.getElementById('extra-content').innerHTML = ''; // AI games don't have extra buttons

    // Announce the AI game to everyone in Telegram
    const announcement = [`Игра: ${game.name}\n\n${game.rules}`];
    sendGameToBot(game.name, announcement);
}


// =================================================================
// SECTION 3: EVENT LISTENERS
// This code runs only after the HTML page is fully loaded.
// =================================================================

document.addEventListener('DOMContentLoaded', () => {
    console.log("✅ DOM is ready. Attaching event listeners.");

    const classicBtn = document.getElementById('classicButton');
    const aiBtn = document.getElementById('aiButton');

    if (classicBtn) {
        classicBtn.addEventListener('click', generateClassic);
        console.log("✅ Event listener attached to Classic Game button.");
    } else {
        console.error("❌ Could not find the Classic Game button!");
    }

    if (aiBtn) {
        aiBtn.addEventListener('click', generateAI);
        console.log("✅ Event listener attached to AI Game button.");
    } else {
        console.error("❌ Could not find the AI Game button!");
    }
});
