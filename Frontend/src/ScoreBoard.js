import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { gettinglist } from './redux/scoreboard';

const LiveScoreBoard = () => {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.scoreboard.listofusers);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        fetch('http://localhost:5000/scores', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            } else {
              return response.json();
            }
          })
          .then(data => {
            dispatch(gettinglist(data));
          })
          .catch(error => {
            console.error('Error:', error);
            throw error; // Rethrow the error to handle it in the calling function
          });
      } catch (error) {
        console.error('Error:', error);
        throw error; // Rethrow the error to handle it in the calling function
      }
    }
  }, [dispatch]);

  return (
    <div className="bg-gray-200 min-h-screen overflow-x-auto">
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold text-gray-800 text-center mb-6">Live Score Board</h1>
        <div className=" rounded-lg border border-gray-300">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Game Win</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Game Loose</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {userData && userData.map((user, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">{user.username}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.gamewin}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.gameloose}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LiveScoreBoard;
