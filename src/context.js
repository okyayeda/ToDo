import React,{Component} from "react";
// import axios from "axsios";
const UserContext=React.createContext();
//provider, consumer
const reducer =(state, action)=>{
  switch(action.type){
    case "DELETE_USER":
      return{
        ...state,
        users: state.users.filter(user =>action.payload !== user.id)
      }
      case"ADD_TODO":
      return{
        ...state,
        users:[...state.users,action.payload]
      }
      case "UPDATE_TODO":
       return {
         ...state,
         users: state.users.map(user => user.id === action.payload.id ? action.payload : user)
       }

      default:
        return state
  }
}

export class UserProvider extends Component {
    state={
        users:[{
          id:"1",
          name: "FrontEnd"
        }],
         dispatch :action =>{
           this.setState(state=> reducer (state,action))
         }
    
      }
    //   componentDidMount=async()=> {
    //    const response= await axios.get("http://localhost:3004/users")
    //  console.log(response);
    //  this.setState({
    //    users:response.data
    //  })
      // }

      
    render() {
        return (
            <UserContext.Provider value={this.state}>
               {this.props.children}
            </UserContext.Provider>
        )
    }
}
const UserConsumer=UserContext.Consumer;
export default UserConsumer
