// 1. 单元切换功能
const unitButtons = document.querySelectorAll('.unit-tabs button');
const wordLists = document.querySelectorAll('.word-list');

unitButtons.forEach(button => {
    button.addEventListener('click', () => {
        // 移除所有按钮的active状态
        unitButtons.forEach(btn => btn.classList.remove('active'));
        // 给当前点击的按钮添加active
        button.classList.add('active');
        
        // 隐藏所有单词列表
        wordLists.forEach(list => list.classList.remove('active'));
        // 显示对应单元的单词列表
        const targetId = button.getAttribute('data-target');
        document.getElementById(targetId).classList.add('active');
        
        // 切换单元后清空搜索框并重置搜索结果
        const searchInput = document.getElementById('wordSearch');
        searchInput.value = '';
        showAllWords();
    });
});

// 2. 发音功能（调用浏览器语音合成API，无需额外接口）
function playAudio(btn) {
    // 获取当前单词项的单词内容
    const wordItem = btn.closest('.word-item');
    const wordText = wordItem.getAttribute('data-word');
    
    // 创建语音实例
    const speech = new SpeechSynthesisUtterance();
    speech.text = wordText; // 要发音的文本
    speech.lang = 'en-US'; // 美式英语发音
    speech.volume = 1; // 音量（0-1）
    speech.rate = 0.9; // 语速（0.1-10）
    speech.pitch = 1; // 音调（0-2）
    
    // 播放发音
    window.speechSynthesis.speak(speech);
}

// 3. 单词搜索功能（模糊搜索：匹配单词或释义）
const searchInput = document.getElementById('wordSearch');
searchInput.addEventListener('input', function() {
    const searchText = this.value.trim().toLowerCase();
    
    // 如果搜索框为空，显示所有单词
    if (!searchText) {
        showAllWords();
        return;
    }
    
    // 获取当前激活的单词列表
    const activeList = document.querySelector('.word-list.active');
    const allWordItems = activeList.querySelectorAll('.word-item');
    
    allWordItems.forEach(item => {
        const word = item.getAttribute('data-word').toLowerCase();
        const trans = item.querySelector('.trans').textContent.toLowerCase();
        
        // 匹配单词或释义，匹配到显示，否则隐藏
        if (word.includes(searchText) || trans.includes(searchText)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
});

// 显示当前单元所有单词的辅助函数
function showAllWords() {
    const activeList = document.querySelector('.word-list.active');
    const allWordItems = activeList.querySelectorAll('.word-item');
    allWordItems.forEach(item => {
        item.style.display = 'flex';
    });
}