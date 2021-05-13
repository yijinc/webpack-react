import _ from 'lodash';
import './style.css';
import img from './header.jpeg';

function component() {
    const element = document.createElement('div');

    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    element.classList.add('hello');

    // 将图像添加到我们已经存在的 div 中。
    const myIcon = new Image();
    myIcon.src = img;

    element.appendChild(myIcon);

    return element;
}
document.body.appendChild(component());