import React from "react";
import { FormattedMessage } from "react-intl";
import rest from '../API/rest';

class Lyceen extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor (props) {
        super(props);
    }

    deleteUser = (id_user) => {
        rest.deleteUser(id_user).then((response) => {
            // eslint-disable-next-line eqeqeq
            if (response.status == 200) {
                this.props.refresh();
                alert ('éléve supprimé')
            }
        })
    }

    updateUser = (user) => {
        this.props.loadUser(user);
    }

    render () {
        const user = this.props.user
        return(
        <div>
            <p><b>{user.lastName} - {user.firstName} - {user.age} ans - {user.level}
                <button class="rounded-pill" style={{marginLeft:7, width:50,height:12, border:1, color: "red"}} onClick={() => this.deleteUser(user.id)}><FormattedMessage id="lycee.body.btnDelete" /></button>
                <button class="rounded-pill" style={{marginLeft:9, width:50,height:12, border:1, color: "blue"}} onClick={() => this.updateUser(user)}><FormattedMessage id="lycee.body.btnModify" /></button></b></p>
        </div> )

    }

}
export default Lyceen;