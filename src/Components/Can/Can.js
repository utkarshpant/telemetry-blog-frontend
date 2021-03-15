import React, { Component } from 'react';
import rules from '../../rbac-rules';

class Can extends Component {
    constructor(props) {
        super(props);
    }

    check = (rules, role, action, data) => {
        const permissions = rules[role];
        if (!permissions) {
            
            return false;
        }

        const staticPermissions = permissions.static;
        if (staticPermissions && staticPermissions.includes(action)) {
            
            return true;
        }

        const dynamicPermissions = permissions.dynamic;
        if (dynamicPermissions) {
            
            const permissionCondition = dynamicPermissions[action];
            if (!permissionCondition) {
                
                return false;
            }
            return permissionCondition(data);
        }

        return false;
    };

    render() {
        
        return this.check(rules, this.props.role, this.props.perform, this.props.data)
            ? this.props.yes()
            : this.props.no();
    }
}

// const check = (rules, role, action, data) => {
//     const permissions = rules[role];

//     if (!permissions) {
//         return false;
//     }

//     const staticPermissions = permissions.static;
//     if (staticPermissions && staticPermissions.includes(action)) {
//         return true;
//     }

//     const dynamicPermissions = permissions.dynamic;
//     if (dynamicPermissions) {
//         const permissionCondition = dynamicPermissions[action];
//         if (!permissionCondition) {
//             return false;
//         }

//         return permissionCondition(data);
//     }

//     return false;
// };

// const Can = props => {
//     check(rules, props.role, props.action, props.data)
//         ? props.yes()
//         : props.no();
// };

Can.defaultProps = {
    yes: () => null,
    no: () => null
};

export default Can;
