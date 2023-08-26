import { IoBarChartSharp } from 'react-icons/io5';
import { MdQueryStats, MdAdminPanelSettings } from 'react-icons/md';
import { FaWpforms } from 'react-icons/fa';
import { ImProfile } from 'react-icons/im';

const links = [
  { text: 'add job', path: '/dashboard/', icon: <FaWpforms /> },
  { text: 'all jobs', path: '/dashboard/all-jobs', icon: <MdQueryStats /> },
  { text: 'stats', path: '/dashboard/stats', icon: <IoBarChartSharp /> },
  { text: 'profile', path: '/dashboard/profile', icon: <ImProfile /> },
  { text: 'admin', path: '/dashboard/admin', icon: <MdAdminPanelSettings /> },
];

export default links;
