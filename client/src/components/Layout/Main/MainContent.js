import { Switch } from 'react-router-dom';
import PrivateRoute from '../../../Pages/PrivateRoute';
import DisplayNote from '../../Display/DisplayNote';
import NotesPage from '../../../Pages/Notes/NotesPage';
import Editor from '../../Notes/Editor';

const notebookRoutes = {
  nb: ['/notebooks', '/notebooks/:nbId', '/notebooks/:nbId/notes'],
  display: '/notebooks/:nbId/notes/:noteId',
  editor: {
    new: '/notebooks/:nbId/editor',
    edit: '/notebooks/:nbId/notes/:noteId/editor',
  },
};

const MainContent = () => {
  return (
    <Switch>
      <PrivateRoute path={notebookRoutes.nb} component={NotesPage} exact />
      <PrivateRoute
        path={notebookRoutes.display}
        component={DisplayNote}
        exact
      />
      <PrivateRoute path={notebookRoutes.editor.new} component={Editor} exact />
      <PrivateRoute
        path={notebookRoutes.editor.edit}
        component={Editor}
        exact
      />
    </Switch>
  );
};

export default MainContent;
