import { Link, useLocation } from 'react-router-dom';
import { buildTrackedPath } from '@/lib/attribution';

/**
 * Internal Link that preserves attribution (UTMs/click IDs) across SPA navigation.
 */
const TrackedLink = ({ to, children, ...props }) => {
  const location = useLocation();

  // Only support simple string paths for now (keeps usage predictable)
  const trackedTo = typeof to === 'string' ? buildTrackedPath(to, location.search) : to;

  return (
    <Link to={trackedTo} {...props}>
      {children}
    </Link>
  );
};

export default TrackedLink;


