# PathBuilder

PathBuilder is a JavaScript utility that transforms the properties of an object such that accessing any property returns a path string based on a base path and the object's key hierarchy. This is particularly useful for applications where path consistency and traceability across different components or services are required.

## Installation

Install PathBuilder using npm:

```bash
npm install path-builder
```

## Usage
To use PathBuilder, import it into your project and pass your object along with the desired base path:

```js
import { PathBuilder } from '@scr2em/path-builder';

const myObj = {
  user: {
    id: '123',
    profile: {
      name: 'John'
    }
  }
};

const apiPaths = PathBuilder(myObj, '/api');

console.log(apiPaths.user.id);        // Outputs: '/api/user/123'
console.log(apiPaths.user.profile.name); // Outputs: '/api/user/profile/John'
```

* doesn't support arrays or objects with circular references

## Contributing
Contributions are always welcome! Please read the contributing guidelines first.

## License
This project is licensed under the ISC License - see the LICENSE file for details.