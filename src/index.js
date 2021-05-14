import './style.css';
import img from './header.jpeg';
import printMe from './print.js';

function getComponent() {
    const element = document.createElement('div');
    element.classList.add('hello');

    return import('lodash').then(({ default: _ }) => {

      element.innerHTML = _.join(['Hello', 'webpack'], ' ');

      return element;
    }).catch((error) => 'An error occurred while loading the component');
}

getComponent().then((component) => {
    document.body.appendChild(component);
});