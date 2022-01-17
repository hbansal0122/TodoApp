import { useState } from "react"

const AddTask = ({onAdd}) => {
    const [text, setText] = useState("");
    const [day, setDay] = useState("");
    const [reminder, setReminder] = useState(false);

    const submitTask = (e) => {
        e.preventDefault();
        if (!text) {
            alert("Please add text")
            return;
        }
        if (!day) {
            alert("Please add day")
            return;
        }
        onAdd({text, day, reminder});

        // clear the state for new task
        setDay("");
        setText("");
        setReminder(false);

    }
    return (
        <form className="add-form" onSubmit={submitTask}>
            <div className="form-control">
                <label>
                    Task
                </label>
                <input type="text" placeholder="Add Task" value={text} onChange={(e) => setText(e.target.value)}/>
            </div>
            <div className="form-control">
                <label>
                    Day
                </label>
                <input type="text" placeholder="Add Day" value={day} onChange={(e) => setDay(e.target.value)}/>
            </div>
            <div className="form-control form-control-check">
                <label>
                    Reminder
                </label>
                <input type="checkbox" value={reminder} checked={reminder} onChange={(e) => setReminder(e.currentTarget.checked)}/>
            </div>
            <input type="submit" value="Save Task" className="btn btn-block"/>
        </form>
    )
}

export default AddTask
