import TodoRedux from "../component/todo-redux";
import Container from "../component/ui/container";

const ContactPage = () => {
    return (
      <>
          <Container>
              <h1 className="text-2xl font-medium mb-6 capitalize">Contact Page</h1>
              <TodoRedux/>
          </Container>
      </>
    );
  };
  
export default ContactPage;
  