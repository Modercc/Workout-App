import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const WorkoutForm = () => {
    const { dispatch } = useWorkoutsContext()
    const { user } = useAuthContext()
    
    const [ title, setTitle ] = useState('');
    const [ load, setLoad ] = useState('');
    const [ reps, setReps ] = useState('');
    const [ error, setError ] = useState(null);
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if(!user) {
            setError('You must be logged in')
            return
        }

        const workout = { title, load, reps }
        const response = await fetch('/api/workouts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify(workout)     
        })
        const json = await response.json()
        console.log(response)

        if(!response.ok) {
            setError(json.error);
            setEmptyFields(json.emptyFields)
        }
        
        if (response.ok) {
            setTitle('')
            setLoad('')
            setReps('')
            setError(null);
            setEmptyFields([])
            console.log('New workout added', json)
            dispatch({type: 'CREATE_WORKOUT', payload: json})
        }
    }

    return (
        <form action="" className="create" onSubmit={handleSubmit}>
            <h3>Add a New Workout</h3>

            <label>Exercise Title:</label>
            <input type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={ emptyFields.includes('title') ? 'error' : ''} />

            <label>Load (in Kg):</label>
            <input type="number"
            value={load}
            onChange={(e) => setLoad(e.target.value)}
            className={ emptyFields.includes('load') ? 'error' : ''} />

            <label>Reps:</label>
            <input type="number"
            value={reps}
            onChange={(e) => setReps(e.target.value)}
            className={ emptyFields.includes('reps') ? 'error' : ''} />

            <button>Add workout</button>
            { error && <div className="error">{ error }</div> }
        </form>
     );
}
 
export default WorkoutForm;