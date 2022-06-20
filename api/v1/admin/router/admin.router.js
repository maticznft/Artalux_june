import express from 'express';
const Router = express();

import adminpanel from './admin';
Router.use('/panel',adminpanel);


export default Router;
