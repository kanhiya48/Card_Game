import React from 'react';

const Card = ({ type }) => {
  let content;
  
  switch (type) {
    case '😼':
      content = 'Cat';
      break;
    case '🙅‍♂️':
      content = 'Defuse';
      break;
    case '🔀':
      content = 'Shuffle';
      break;
    case '💣':
      content = 'Exploding Kitten';
      break;
    default:
      content = 'Unknown';
  }

  return (
    <div className="card flex border-4  border-red-500 items-center text-center h-full">
      <div className='w-full'>
      <p>{content}</p>
      <div>{type}</div>
      </div>
    </div>
  );
};

export default Card;
