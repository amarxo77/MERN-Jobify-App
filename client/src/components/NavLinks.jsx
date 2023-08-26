import { NavLink } from 'react-router-dom';
import links from '../utils/links';
import { useDashboardContext } from '../pages/DashboardLayout';

const NavLinks = ({ isBigSidebar }) => {
  const { toggleSidebar, user } = useDashboardContext();
  return (
    <div className="nav-links">
      {links.map((link) => {
        const { icon, path, text } = link;
        const { role } = user;
        if (path === '/dashboard/admin' && role !== 'admin') return;
        return (
          <NavLink
            key={text}
            to={path}
            className="nav-link"
            end
            onClick={!isBigSidebar && toggleSidebar}
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};

export default NavLinks;
