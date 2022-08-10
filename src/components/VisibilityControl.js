export const VisibilityControl = ({isChecked, setshowCompleted, cleanTask}) => {
    const handleDelete = () => {
        if (window.confirm('Esta seguro de querer eliminarlo?')){
            cleanTask()
        }
    }

    return(
        <div className="d-flex justify-content-between bg-secondary text-white text-center p-2 border-secondary">
        <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              checked={isChecked}
              onChange={(e) => setshowCompleted(e.target.checked)}
            />
            <label>Mostrar tareas echas</label>
        </div>
        <button onClick={handleDelete} className="btn btn-danger btn-sm">
            Clear
        </button>
      </div>
    )
}