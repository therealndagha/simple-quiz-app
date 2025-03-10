
import CreateQuiz from "./createQuiz";
import ViewAvailableQuizzes from "./viewAvailableQuizzes";


const Admin = () => {
    

    return (
        <div className="p-3 m-3">
            <h2 className="text-4xl">Admin Dashboard</h2>
            <CreateQuiz />
            <ViewAvailableQuizzes />
        </div>
    );
};

export default Admin;
