// カウンターのデータ管理
let counters = {
    win: 0,
    loss: 0,
    sub: 0
};

// カウンター増減処理
function changeCount(type, value) {
    counters[type] += value;
    if (counters[type] < 0) counters[type] = 0; // マイナスにいかないようにガード
    
    // 画面の数字を更新
    document.getElementById('win-count').innerText = counters.win;
    document.getElementById('loss-count').innerText = counters.loss;
    document.getElementById('sub-count').innerText = counters.sub;
}

// リセット処理
function resetAll() {
    if(confirm('すべてのカウントを0に戻しますか？')) {
        counters.win = 0;
        counters.loss = 0;
        counters.sub = 0;
        document.getElementById('win-count').innerText = 0;
        document.getElementById('loss-count').innerText = 0;
        document.getElementById('sub-count').innerText = 0;
    }
}

// タブ切り替え処理
function openTab(tabId) {
    const panels = document.querySelectorAll('.tab-panel');
    panels.forEach(panel => panel.classList.remove('active'));

    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));

    document.getElementById(tabId).classList.add('active');
    event.currentTarget.classList.add('active');
}

// 設定のリアルタイム反映（色・文字・レイアウト）
function updateSettings() {
    // 1. 入力値の取得
    const gameTitle = document.getElementById('game-title-input').value;
    const subLabel = document.getElementById('sub-label-input').value;
    const layout = document.getElementById('layout-select').value;
    
    const colorWin = document.getElementById('color-win').value;
    const colorLoss = document.getElementById('color-loss').value;
    const colorText = document.getElementById('color-text').value;
    const colorShadow = document.getElementById('color-shadow').value;

    // 2. 文字の更新
    document.getElementById('game-title-display').innerText = gameTitle;
    document.getElementById('sub-label-display').innerText = subLabel;
    const subLabels = document.querySelectorAll('.sub-btn-label');
    subLabels.forEach(el => el.innerText = subLabel);

    // 3. レイアウトクラスの変更
    const container = document.getElementById('overlay-container');
    container.className = layout; // クラス名をそっくり入れ替える

    // 4. カラー（CSSスタイル）の直接書き換え
    // 影のスタイルを共通化
    const textShadowStr = `2px 2px 0 ${colorShadow}, -2px -2px 0 ${colorShadow}, 2px -2px 0 ${colorShadow}, -2px 2px 0 ${colorShadow}`;
    
    container.style.color = colorText;
    container.style.textShadow = textShadowStr;
    
    document.querySelector('.win-group').style.color = colorWin;
    document.querySelector('.loss-group').style.color = colorLoss;
}

// プレビューボックスの背景切り替え（確認用）
function togglePreviewBg() {
    const bgType = document.getElementById('bg-select').value;
    const previewBox = document.getElementById('overlay-preview');
    
    if (bgType === 'dark') {
        previewBox.style.backgroundColor = '#0b0b0d';
    } else if (bgType === 'transparent') {
        previewBox.style.backgroundColor = 'transparent';
    } else if (bgType === 'green') {
        previewBox.style.backgroundColor = '#00ff00';
    }
}

// URLコピー機能
function copyURL() {
    const urlInput = document.getElementById('obs-url-input');
    urlInput.select();
    document.execCommand('copy');
    alert('OBS用URLをクリップボードにコピーしました！');
}

// 初期化時に一度設定を読み込む
window.onload = function() {
    updateSettings();
};