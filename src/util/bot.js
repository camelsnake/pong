const buttonsFragment = document.createRange().createContextualFragment(`
<div>
    <button onclick='startBot(1)'>Start First Bot</button>
    <button onclick='startBot(2)'>Start Second Bot</button>
</div>
`);

let buttonDown = false;
let botActive = false;

function _dispatchEvent(type = 'keyup', keyCode = 40) {
    let e = new KeyboardEvent(type, { bubbles: true, cancelable: true, keyCode });
    document.dispatchEvent(e);
}

function followBall(paddleId) {
    let paddle = document.querySelector(`.paddle${paddleId}`).getBoundingClientRect();
    let ball = document.querySelector('.ball').getBoundingClientRect();

    paddle.y += 20;

    if (buttonDown || (Math.abs(ball.x - paddle.x) < 10)) return;

    if ((ball.y - paddle.y) < -10) {
        _dispatchEvent('keydown', 38);
        setTimeout(() => {
            _dispatchEvent('keyup', 38);
            buttonDown = false;
        }, 40);

        buttonDown = true;
    } else if ((ball.y - paddle.y) > 10) {
        _dispatchEvent('keydown', 40);
        setTimeout(() => {
            _dispatchEvent('keyup', 40);
            buttonDown = false;
        }, 40);

        buttonDown = true;
    }
}

window.startBot = function(paddleId) {
    if (botActive) return;

    botActive = true;
    setInterval(() => {
        followBall(paddleId);
    });
};

export default buttonsFragment;
