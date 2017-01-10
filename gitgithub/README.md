## Seneca
Seneca is a microservices toolkit for Node.js. It provides plugins that look after the foundations of your app. This leaves you free to focus on the real, business code. No need to worry about which database to use, how to structure your components, or how to manage dependencies.

### Core features of Seneca:

**Pattern matching:** Instead of fragile service discovery, you just let the world know what sort of messages you care about.

**Transport independence:** You can send messages between services in many ways, all hidden from your business logic.

**Componentisation:** Functionality is expressed as a set of plugins which can be composed together as microservices.

### Seneca Patterns Example

```
var seneca = require('seneca')()

seneca.add('role:math,cmd:sum', (msg, reply) => {
  reply(null, {answer: (msg.left + msg.right)})
})

seneca.act({role: 'math', cmd: 'sum', left: 1, right: 2}, function (err, result) {
  if (err) return console.error(err)
  console.log(result)
})
```
