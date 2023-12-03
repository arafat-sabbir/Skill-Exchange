
import ReactDOM from "react-dom";
import { PushSpinner } from "react-spinners-kit";


const Loading = () => {
    return (
        
        class App extends React.Component {
            constructor(props) {
                super(props);
                this.state = {
                    loading: true,
                };
            }
        
            render() {
                const { loading } = this.state;
                return <PushSpinner size={30} color="#686769" loading={loading} />;
            }
        }

    );
};

export default Loading;