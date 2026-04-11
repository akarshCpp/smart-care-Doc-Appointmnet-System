import doctor1 from '../assets/avatars/doctor-1.jpg';
import doctor2 from '../assets/avatars/doctor-2.jpg';
import doctor3 from '../assets/avatars/doctor-3.jpg';
import doctor4 from '../assets/avatars/doctor-4.jpg';
import doctor5 from '../assets/avatars/doctor-5.png';
import doctor6 from '../assets/avatars/doctor-6.png';

const avatars = [doctor1, doctor2, doctor3, doctor4, doctor5, doctor6];

/**
 * Deterministically returns one of the 5 doctor avatars based on the input string (name or ID).
 * @param {string} seed - The name or ID of the doctor.
 * @returns {string} - The path to the avatar image.
 */
export const getDoctorAvatar = (seed) => {
  if (!seed) return avatars[0];
  
  // Simple hash function to map a string to an index
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const index = Math.abs(hash) % avatars.length;
  return avatars[index];
};
