const Updated = (props) => {
    return (
        <div id="alert" className="alert alert-success updated" role="alert">
            Task updated Successfully <i className="bi bi-check2-all"/>
            <button type="button" className="btn-close" data-dismiss="alert" aria-label="Close"/>
        </div>
    )
}

export default Updated;