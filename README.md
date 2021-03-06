# curiejs
![](https://travis-ci.org/deepsource/curiejs.svg?branch=master)

With `curiejs` you can handle [curie links](https://www.w3.org/TR/curie/curie-diff.html) provided by [hypermedia](https://en.wikipedia.org/wiki/Hypermedia) (e.g. [HATEOAS](https://en.wikipedia.org/wiki/HATEOAS)) APIs.

## Install

You can install `curiejs` with `npm`:

```shell
    npm install curiejs --save
```

## Usage

You can use `curiejs` in your `javascript` projects:

```javascript
    import Curie from 'curiejs'

    // Hypermedia link as provided by hypermedia api (e.g. spring-data-rest)
    const link = "http://localhost:4000/api/entity{?page,size,projection}";

    // Parameters
    const params = { page: 1, projection: 'detail' };

    new Curie(link).toUri(); 
    // --> 'http://localhost:4000/api/entity'

    new Curie(link, params).toUri(); 
    // --> 'http://localhost:4000/api/entity?page=1&projection=detail'
```

## License

Relased under the [MIT](https://opensource.org/licenses/MIT) licence by Sebastian Ullrich ([deepsource.de](https://deepsource.de)).
