import { LogoutButton } from '../component/auth/LogoutButton';
import Container from '../component/ui/container';
const Dashboard = () => {
    return (
    <Container>
        <h1 className="text-2xl font-medium mb-6 capitalize">Dashboard  Page</h1>
        <LogoutButton />
    </Container>

    );
  };
  
export default Dashboard;
  