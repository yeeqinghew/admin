import "./Login.css"
import {useState} from 'react'
import {auth} from "../firebase"
import {useNavigate} from 'react-router-dom'
import {signInWithEmailAndPassword} from 'firebase/auth'

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signIn = (authenticate) => {
        signInWithEmailAndPassword(auth, email, password)
        .then(auth => {navigate('/Home')})
        .catch(error => console.error(error))
        authenticate();
    }

    return(
         <div className="div">
            <h1 className="h1">Sign In</h1>
            <label class="label">E-Mail: </label>
            <input onChange={(event) => setEmail(event.target.value)} autoComplete="off" className="input" type="email" name="email"/>
            <br />
            <br />
            <label class="label">Password: </label>
            <input onChange={(event) => setPassword(event.target.value)} autoComplete="off" className="input" type="password" name="password"/>
            <br />
            <br />
            <button onClick={signIn} className="btn btn-edit">Sign In</button>
        </div> 
    )
}
export default Login;


//          <Card>
//           <Card.Body>
//           <h2 className="text-center mb-4">Log In</h2>
//            {error && <Alert variant="danger">{error}</Alert>}
//             <Form onSubmit={handleSubmit}>
//               <Form.Group id="email">
//               <Form.Label>Email</Form.Label>
//               <Form.Control type="email" ref={emailRef} required />
//            </Form.Group>
//                <Form.Group id="password">
//                  <Form.Label>Password</Form.Label>
//                  <Form.Control type="password" ref={passwordRef} required />
//                </Form.Group>
//                <Button disabled={loading} className="w-100" type="submit">
//                  Log In
//                </Button>
//              </Form>
//             <div className="w-100 text-center mt-3">
//               <Link to="/forgot-password">Forgot Password?</Link>
//              </div>
//            </Card.Body>
//          </Card>

