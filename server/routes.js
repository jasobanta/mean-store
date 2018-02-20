/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';

export default function(app) {
  // Insert routes below
  app.use('/api/paytms', require('./api/paytm'));
  app.use('/api/orderdetails', require('./api/orderdetail'));
  app.use('/api/jobprocess', require('./api/jobprocess'));
  app.use('/api/inventorys', require('./api/inventory'));
  app.use('/api/uploads', require('./api/upload'));
  app.use('/api/things', require('./api/thing'));
  app.use('/api/users', require('./api/user'));

  app.use('/auth', require('./auth').default);
  app.use('/api/categories', require('./api/category'));
  app.use('/api/products', require('./api/product'));
  app.use('/api/carts', require('./api/cart'));
  app.use('/api/orders', require('./api/order'));
  app.use('/api/enquirys', require('./api/enquiry'));
  app.use('/api/masters', require('./api/master'));
  app.use('/api/masterattrs', require('./api/masterattr'));
  app.use('/api/vendors', require('./api/vendor'));
  app.use('/api/brands', require('./api/brand'));
  app.use('/api/events', require('./api/event'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the app.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(`${app.get('appPath')}/app.html`));
    });
}
