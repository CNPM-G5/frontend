// src/pages/dashboard/LessonPage.tsx
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { lessonApi, LessonDetail } from '../../api/lessonApi';
import AiChat from '../../components/common/AiChat';
import axiosClient from '../../api/axios';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// Fix content từ DB: đảm bảo list items xuống dòng đúng
const formatContent = (text: string) => {
  if (!text) return '';

  let result = text
    // 1. Fix bold bị split dòng: **text\\\n** → **text**
    .replace(/\*\*([^*]+)\\\s*\n\s*\*\*/g, '**$1**')
    // 2. Xóa \ thừa cuối dòng (trước newline hoặc cuối string)
    .replace(/\\\s*\n/g, '\n')
    .replace(/\\\s*$/gm, '')
    // 3. Convert bullet unicode • thành markdown list -
    .replace(/^[•]\s*/gm, '- ')
    // 4. Thêm blank line trước heading ###/####
    .replace(/([^\n])\n(#{1,6}\s)/g, '$1\n\n$2')
    // 5. Thêm blank line trước list item -
    .replace(/([^\n])\n(-\s)/g, '$1\n\n$2')
    // 6. Thêm blank line sau list item trước text thường
    .replace(/(^-\s[^\n]+)\n([^-\s#\n])/gm, '$1\n\n$2')
    // 7. Thêm blank line trước → arrow
    .replace(/([^\n])\n(→)/g, '$1\n\n$2');

  // 8. Convert bảng pandoc/rst format thành markdown table
  // Pattern: dòng --- ở đầu, rows với spacing, dòng --- ở cuối
  result = result.replace(
    /[ \t]*---+\s*\n([\s\S]+?)\n[ \t]*---+/g,
    (_, tableBody) => {
      const rows = tableBody
        .split('\n')
        .map((l: string) => l.trim())
        .filter((l: string) => l && l !== '--- ---' && l !== '---');

      if (rows.length < 2) return tableBody;

      // Parse mỗi row: split bởi 2+ spaces
      const parsed = rows.map((r: string) => r.split(/\s{2,}/));
      const colCount = Math.max(...parsed.map((r: string[]) => r.length));
      if (colCount < 2) return tableBody;

      const header = parsed[0];
      const separator = Array(colCount).fill('---');
      const body = parsed.slice(1);

      const toRow = (cols: string[]) => '| ' + cols.map((c: string) => c || '').join(' | ') + ' |';

      return [toRow(header), toRow(separator), ...body.map(toRow)].join('\n');
    }
  );

  return result;
};

const LessonPage = () => {
  const { id } = useParams<{ id: string }>();
  const [lesson, setLesson] = useState<LessonDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [completing, setCompleting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isCompleting, setIsCompleting] = useState(false);


  // Lấy dữ liệu bài học
  useEffect(() => {
    const fetchLesson = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const data = await lessonApi.getLessonByIdApi(id);
        setLesson(data);
      } catch (err) {
        setError('Không thể tải nội dung bài học.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchLesson();
  }, [id]);

  // Cuộn lên đầu trang khi lesson ID thay đổi
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Hàm xử lý khi bấm nút "Đánh dấu hoàn thành"
  const handleComplete = async () => {
    if (!id || !lesson) return;
    try {
      setCompleting(true);
      await lessonApi.completeLessonApi(id);

      // Cập nhật lại UI state ngay lập tức mà không cần gọi lại API
      setLesson({ ...lesson, is_completed: true });
    } catch (err) {
      alert('Có lỗi xảy ra khi lưu tiến độ. Vui lòng thử lại.');
      console.error(err);
    } finally {
      setCompleting(false);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center h-[60vh]">
      <div className="w-10 h-10 border-4 rounded-full border-t-primary border-primary/20 animate-spin"></div>
    </div>
  );

  if (error || !lesson) return (
    <div className="p-8 text-center">
      <h2 className="text-2xl text-red-400">{error || 'Không tìm thấy bài học'}</h2>
      <Link to="/dashboard/courses" className="inline-block mt-4 transition-colors text-primary hover:text-primary-dark">Về danh sách khóa học</Link>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto pb-20 relative">
      {/* Nút quay lại khóa học */}
      <Link to={`/dashboard/course/${lesson.course_id}`} className="inline-flex items-center gap-2 mb-6 transition-colors text-text-muted hover:text-primary">
        <span>←</span> Quay lại chi tiết khóa học
      </Link>

      {/* Tên bài học */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 text-xs font-bold text-white uppercase rounded-full bg-gradient-primary">
            Bài {lesson.order_index}
          </span>
        </div>
        <h1 className="text-4xl font-bold leading-tight text-text-light">{lesson.title}</h1>
      </div>

      {/* Khung nhúng Slide (Iframe) */}
      {lesson.slide_url && (
        <div className="w-full mb-10 overflow-hidden border rounded-xl border-primary/30 shadow-neon aspect-video bg-background-card">
          <iframe
            src={lesson.slide_url}
            title="Bài giảng Slide"
            className="w-full h-full"
            allowFullScreen
          ></iframe>
        </div>
      )}

      {/* Nội dung bài giảng (Content) */}
      <div className="p-8 mb-10 border rounded-xl bg-background-card border-primary/20">
        <h3 className="mb-4 text-xl font-bold text-primary">Nội dung bài học</h3>
        <div className="leading-relaxed text-text-light/90 prose prose-sm max-w-none prose-headings:text-text-light prose-p:text-text-light/90 prose-strong:text-text-light prose-li:text-text-light/90 prose-code:text-primary prose-table:w-full prose-th:bg-primary/10 prose-th:text-text-light prose-th:p-2 prose-td:p-2 prose-td:border prose-td:border-primary/20 prose-tr:border-b prose-tr:border-primary/10">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{formatContent(lesson.content)}</ReactMarkdown>
        </div>
      </div>

      {/* Khu vực Nút Hoàn thành */}
      <div className="flex justify-end pt-6 border-t border-primary/20">
        {lesson.is_completed ? (
          <div className="flex items-center gap-2 px-6 py-3 font-bold text-green-400 border border-green-500/30 rounded-lg bg-green-500/10">
            <span className="text-xl">✅</span> Đã hoàn thành bài học
          </div>
        ) : (
          <button
            onClick={handleComplete}
            disabled={completing}
            className="flex items-center gap-2 px-6 py-3 font-bold text-white transition-all rounded-lg bg-gradient-primary hover:shadow-neon disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {completing ? (
              <span className="w-5 h-5 border-2 rounded-full border-t-white border-white/30 animate-spin"></span>
            ) : (
              <span>📝</span>
            )}
            {completing ? 'Đang lưu...' : 'Đánh dấu hoàn thành'}
          </button>
        )}
      </div>
      {lesson && <AiChat lessonId={lesson.id} courseId={lesson.course_id} />}
    </div>
  );
};

export default LessonPage;