import _ from 'lodash';
import './style.css';
import img from './header.jpeg';
import Print from './print';

function component() {
    const element = document.createElement('div');

    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    element.classList.add('hello');

    const btn = document.createElement('button');
    btn.innerHTML = 'Click me and check the console!';
    btn.onclick = Print.bind(null, 'Hello webpack!');;
    element.appendChild(btn);

    // 将图像添加到我们已经存在的 div 中。
    const myIcon = new Image();
    myIcon.src = img;

    element.appendChild(myIcon);

    return element;
}
document.body.appendChild(component());

if (module.hot) {
    module.hot.accept('./print.js', function() {
        console.log('Accepting the updated printMe module!');
        Print('hot module replacement ');
    })
}