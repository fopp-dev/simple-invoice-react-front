import React, { Component } from 'react'
// import { Container, Row, Col } from 'reactstrap';

class PageTitle extends Component {
    render() {
        const {
            title
        } = this.props;

        return (
            <div className="page_title section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="page_title-content">
                                <h3 className='text-white'>
                                    {title || 'Welcome'}
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default PageTitle;
