import { cube } from './math.js';
// import './style.css';
// import Print from './print';

if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!');
}

console.log('__webpack_public_path__', __webpack_public_path__)
console.log('import.meta', import.meta)

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then(registration => {
      console.log('SW registered: ', registration);
    }).catch(registrationError => {
      console.log('SW registration failed: ', registrationError);
    });
  });
}

function component() {
  const element = document.createElement('pre');

  element.innerHTML = [
    'Hello webpack!',
    '5 cubed is equal to ' + cube(5)
  ].join('\n\n');

  return element;
}
document.body.appendChild(component());

// if (module.hot) {
//     module.hot.accept('./print.js', function() {
//         console.log('Accepting the updated printMe module!');
//         Print('hot module replacement ');
//     })
// }