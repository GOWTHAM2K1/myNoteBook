import React from 'react';
import Alert from './Alert'; // Import your Alert component

const About = () => {
 

  return (
    <div>
     <Alert msg="this is about" type="success" />
      <h2 className="text-center">This is about</h2>
    </div>
  );
};

export default About;
