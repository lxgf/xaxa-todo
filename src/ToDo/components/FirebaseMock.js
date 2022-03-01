const mockToDo = { todos: ['todo test1', 'todo test2', 'todo test3'] };
const docResult = {
    // simulate firestore get doc.data() function
    exists: true,
    data: () => mockToDo
};
const get = () => Promise.resolve(docResult);
const set = jest.fn();
const onSnapshot = (() => {
    return () => Promise.resolve(docResult);
});
const doc = (() => {
    return {
        get,
        onSnapshot
    };
});
const collection = (() => {
    return {
        doc
    };
});
const firestore = () => {
    return {
        collection,
    };
};
firestore.FieldValue = {
    serverTimestamp: () => {
        return "MOCK_TIME";
    }
};

export { firestore, mockToDo };