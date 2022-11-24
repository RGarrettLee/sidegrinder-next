import Navbar from '../components/navbar';

export default function Feedback() {
    return (
        <div>
            <Navbar></Navbar>
            <div className="flex justify-center align-center py-15 flex-col">
                <h1 className="text-3xl font-bold text-center">Feedback</h1>
                <h3 className="text-center">You will submit feedback here</h3>
            </div>
        </div>
    )
}