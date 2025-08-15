import { BreadcrumbItem, Breadcrumbs } from '@heroui/react';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useLocation, useNavigate } from 'react-router-dom';

const Breadcrumb = () => {
    const navigate = useNavigate();

    const location = useLocation();

    const getBreadcrumbs = () => {
        const paths = location.pathname.split('/').filter(path => path);

        const pathNames: Record<string, string> = {
            '': 'Tổng quát',
            'users': 'Quản lý người dùng',
            'posts': 'Quản lý bài viết',
            'comments': 'Quản lý bình luận',
            'tags': 'Quản lý thẻ',
            'reports': 'Quản lý báo cáo',
            'notifications': 'Thông báo',
            'settings': 'Cài đặt',
            'analytics': 'Phân tích',
            'file-manager': 'Quản lý tệp',
            'permissions': 'Quản lý quyền',
            'themes': 'Quản lý giao diện',
            'topics': 'Quản lý chủ đề',
            'questions': 'Quản lý câu hỏi',
            'answers':'Quản lý câu trả lời'
        };

        return [
            { path: '/', name: 'Trang chủ' },
            ...paths.map((path, index) => {
                // Build the path up to this point
                const url = `/${paths.slice(0, index + 1).join('/')}`;
                return {
                    path: url,
                    name: pathNames[path] || path.charAt(0).toUpperCase() + path.slice(1)
                };
            })
        ];
    };

    const breadcrumbs = getBreadcrumbs();

    const handleBreadcrumbClick = (path: string, e: React.MouseEvent) => {
        e.preventDefault();
        navigate(path);
    };

    return (
        <div className="bg-content1 px-6 py-2 border-b border-content2 sticky top-[65px] z-10">
            <Breadcrumbs size="sm">
                {breadcrumbs.map((item, index) => (
                    <BreadcrumbItem
                        key={index}
                        href={item.path}
                        isCurrent={index === breadcrumbs.length - 1}
                        onClick={(e) => handleBreadcrumbClick(item.path, e)}
                    >
                        {index === 0 ? (
                            <div className="flex items-center gap-1">
                                <Icon icon="lucide:home" className="text-default-500" fontSize={14} />
                                <span>{item.name}</span>
                            </div>
                        ) : (
                            item.name
                        )}
                    </BreadcrumbItem>
                ))}
            </Breadcrumbs>
        </div>
    );
};

export default Breadcrumb;