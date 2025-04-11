
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RecipeListPage } from './pages/RecipeListPage';
import { RecipeDetailPage } from './pages/RecipeDetailPage';

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RecipeListPage />} />
        <Route path="/recipe/:id" element={<RecipeDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
};
