import useragent from 'express-useragent';
import Visitor from '../models/visitor.model.js'; // Assuming this is where the visitor model is stored

// Middleware to log visitor details
const logVisitor = async (req, res, next) => {
  const source = req.headers['user-agent'];
  const userAgent = useragent.parse(source);
  
  const newVisitor = new Visitor({
    browser: userAgent.browser,
    version: userAgent.version,
    os: userAgent.os,
    platform: userAgent.platform,
    engine: userAgent.engine,
    ipAddress: req.ip,
  });

  try {
    await newVisitor.save();
    next();
  } catch (error) {
    console.error('Error logging visitor data:', error);
    next(); // Move to next middleware or route even if logging fails
  }
};

export default logVisitor;
