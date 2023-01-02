import {fetchTasksWorkerSaga} from './task-sagas';
import {call, put} from 'redux-saga/effects';
import {setAppStatusAC} from '../../app/app-reducer';
import {GetTasksResponse, TaskPriorities, TaskStatuses, todolistsAPI} from '../../api/todolists-api';
import {setTasksAC} from './tasks-reducer';


test('fetchTasksWorkerSaga successful', () => {
    const gen = fetchTasksWorkerSaga({type: '', todolistId: 'todolistId'})
    expect(gen.next().value).toEqual(put(setAppStatusAC('loading')))
    expect(gen.next().value).toEqual(call(todolistsAPI.getTasks, 'todolistId'))
    const fakeApiResponse: GetTasksResponse = {
        error: '',
        totalCount: 1,
        items: [{
            id: '1', title: 'CSS', status: TaskStatuses.New, todoListId: 'todolistId', description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
        }]
    }
    expect(gen.next(fakeApiResponse).value).toEqual(put(setTasksAC(fakeApiResponse.items, 'todolistId')))
    expect(gen.next().value).toEqual(put(setAppStatusAC('succeeded')))
})




