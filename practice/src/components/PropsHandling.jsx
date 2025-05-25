import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 10px;
`;

const Img = styled.img`
    width: 100px;
    height: 100px;

    &:hover {
        border: 1px solid red;
    }
`;
function UserCard({ name, role, onClick, img }) {
    return (
        <Card onClick={onClick}>
            <h2>User Card</h2>
            <p>{name}</p>
            <p>{role}</p>
            <Img src={img} alt={img} />
        </Card>
    );
}

const users = [
    { name: 'John', role: 'Developer', img: '/vite.svg' },
    { name: 'Jane', role: 'Designer', img: '/star.jpeg' },
];
function PropsHandling() {
    const handleClick = () => {
        alert('clicked');
    };
    return (
        <>
            {users.map((user, index) => (
                <UserCard
                    key={index}
                    name={user.name}
                    role={user.role}
                    img={user.img}
                    onClick={handleClick}
                />
            ))}
        </>
    );
}

export default PropsHandling;
