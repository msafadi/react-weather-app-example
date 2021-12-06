import { Component } from 'react';

class Search extends Component {

    constructor(props) {
        super(props);
        this.props = props;
    }
    
    render() { 
        return (<div className="py-5">
            <form className="d-flex" onSubmit={this.props.handleSearch}>
                <input className="form-control" placeholder="Search..." name="city" />
                <button type="submit" className="btn btn-primary ms-2">Search</button>
            </form>
        </div>);
    }
}
 
export default Search;
