// カウンターのデータ管理
let counters = { win: 0, loss: 0, sub: 0 };

// 設定のデータ管理
let settings = {
    gameTitle: "OVERWATCH 2",
    subLabel: "DEATH",
    layout: "layout-horizontal",
    colorWin: "#ff4655",
    colorLoss: "#00f0ff",
    colorText: "#ffffff",
    colorShadow: "#000000"
};

// データをローカルストレージに保存して、もう片方の画面に伝える関数
function saveAndSync() {
    localStorage.setItem('overlay_counters', JSON.stringify(counters));
    localStorage.setItem('overlay_settings', JSON.stringify(settings));
    updateDOM();
}

// カウンター増減処理（インデックス側用）
function changeCount(type, value) {
    counters[type] += value;
    if (counters[type] < 0) counters[type] = 0;
    saveAndSync();
}

// リセット処理
function resetAll() {
    if(confirm('すべてのカウントを0に戻しますか？')) {
        counters.win = 0;
        counters.loss = 0;
        counters.sub = 0;
        saveAndSync();
    }
}

// 画面の表示を更新する関数（両方の画面で共通）
function updateDOM() {
    // 各要素が存在するか確認しながら書き換え
    if(document.getElementById('win-count')) document.getElementById('win-count').innerText = counters.win;
    if(document.getElementById('loss-count')) document.getElementById('loss-count').innerText = counters.loss;
    if(document.getElementById('sub-count')) document.getElementById('sub-count').innerText = counters.sub;
    
    if(document.getElementById('game-title-display')) document.getElementById('game-title-display').innerText = settings.gameTitle;
    if(document.getElementById('sub-label-display')) document.getElementById('sub-label-display').innerText = settings.subLabel;
    
    const subLabels = document.querySelectorAll('.sub-btn-label');
    subLabels.forEach(el => el.innerText = settings.subLabel);

    const container = document.getElementById('overlay-container');
    if (container) {
        container.className = settings.layout;
        const textShadowStr = `2px 2px 0 ${settings.colorShadow}, -2px -2px 0 ${settings.colorShadow}, 2px -2px 0 ${settings.colorShadow}, 2px -2px 0 ${settings.colorShadow}`;
        container.style.color = settings.colorText;
        container.style.textShadow = textShadowStr;
        
        const winGroup = document.querySelector('.win-group');
        const lossGroup = document.querySelector('.loss-group');
        if(winGroup) winGroup.style.color = settings.colorWin;
        if(lossGroup) lossGroup.style.color = settings.colorLoss;
    }
}

// 設定変更時にデータを取得する関数（インデックス側用）
function updateSettings() {
    if(!document.getElementById('game-title-input')) return; // 操作画面じゃなければスキップ
    
    settings.gameTitle = document.getElementById('game-title-input').value;
    settings.subLabel = document.getElementById('sub-label-input').value;
    settings.layout = document.getElementById('layout-select').value;
    settings.colorWin = document.getElementById('color-win').value;
    settings.colorLoss = document.getElementById('color-loss').value;
    settings.colorText = document.getElementById('color-text').value;
    settings.colorShadow = document.getElementById('color-shadow').value;

    saveAndSync();
}

// 【重要】もう片方の画面でデータが変わった瞬間をキャッチするイベント
window.addEventListener('storage', (e) => {
    if (e.key === 'overlay_counters' && e.newValue) counters = JSON.parse(e.newValue);
    if (e.key === 'overlay_settings' && e.newValue) settings = JSON.parse(e.newValue);
    updateDOM();
});

// タブ切り替え処理（インデックス側用）
function openTab(tabId) {
    const panels = document.querySelectorAll('.tab-panel');
    panels.forEach(panel => panel.classList.remove('active'));
    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    event.currentTarget.classList.add('active');
}

// プレビュー背景色切り替え
function togglePreviewBg() {
    const bgType = document.getElementById('bg-select').value;
    const previewBox = document.getElementById('overlay-preview');
    if(!previewBox) return;
    if (bgType === 'dark') previewBox.style.backgroundColor = '#0b0b0d';
    else if (bgType === 'transparent') previewBox.style.backgroundColor = 'transparent';
    else if (bgType === 'green') previewBox.style.backgroundColor = '#00ff00';
}

function copyURL() {
    const urlInput = document.getElementById('obs-url-input');
    urlInput.select();
    document.execCommand('copy');
    alert('OBS用URLをクリップボードにコピーしました！');
}

// 起動時にデータを読み込む
window.onload = function() {
    const localCounters = localStorage.getItem('overlay_counters');
    const localSettings = localStorage.getItem('overlay_settings');
    if (localCounters) counters = JSON.parse(localCounters);
    if (localSettings) settings = JSON.parse(localSettings);
    updateDOM();
};
