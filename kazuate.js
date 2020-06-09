/* アルゴリズム
    1.範囲を指定
    2.探す数値をランダムで獲得
    3.数値を入力
    4.ヒントを与える
    3-4を繰り返す。
    5.数値を当てる
*/
import './kazuate'

const chat = [
    '範囲は?',
    '数値を当ててください',
    '大きいです',
    '小さいです',
    '当たり!!!'
]

// 画面への出力
// valはメッセージ内容，personは誰が話しているか
function output(val, person) {
    // 一番下までスクロール
    const field = document.getElementById('field');
    field.scroll(0, field.scrollHeight - field.clientHeight);
  
    const ul = document.getElementById('chat-ul');
    const li = document.createElement('li');
    // このdivにテキストを指定
    const div = document.createElement('div');
    div.textContent = val;
    
    if (person === 'me') { // 自分
        div.classList.add('chat-right');
        li.classList.add('right');
        ul.appendChild(li);
        li.appendChild(div);
    }else if (person === 'other') { // 相手
        // 相手が2個連続で返信してくる時、その間は返信不可にする
        // なぜなら、自分の返信を複数受け取ったことになり、その全てに返信してきてしまうから
        // 例："Hi!〇〇!"を複数など
        // （今回の相手の連続返信は2個以内とする）
        chatBtn.disabled = true;
        setTimeout( ()=> {
            chatBtn.disabled = false;
            li.classList.add('left');
            div.classList.add('chat-left');
            ul.appendChild(li);
            li.appendChild(div);
        }, 2000); 
    }
}

const chatBtn = document.getElementById('chat-button');
const inputText = document.getElementById('chat-input');

let inputNum;
let correct;
let answer = [];
let state = 1;

function btnFunc() {
    if (!inputText.value) return false;

    output(inputText.value, 'me');

    inputNum = Number(inputText.value)

    setTimeout( () => {
        inputText.value = '';
    }, 1);

    switch (state) {

        case 1:
            correct = Math.floor(Math.random() * Math.floor(inputNum));
            output(chat[1], 'other');
            state = 2;
            break;

        case 2:
            answer.push(inputNum);
            if (inputNum > correct) {
                output(chat[2], 'other');
            } else if (inputNum < correct) {
                output(chat[3], 'other');
            } else {
                output(chat[4], 'other');
                state = 3
            }
            break;
        
        default:
            break;
    }
}

output(chat[0], 'other');