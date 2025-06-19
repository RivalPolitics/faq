import React, { useRef, useEffect, useReducer } from 'react';
import { useFloating, autoUpdate, offset, flip, shift, useDismiss, useRole, FloatingPortal } from '@floating-ui/react';
import { getContent } from './contentLoader';
import { getSlugConfig, isValidSlug, COLOR_CLASSES } from './config';

const LOADER_DURATION = 1000;

function CircularLoader({ progress = 0, size = 20, stroke = 3 }) {
    return <div className='text-[10px] text-blue-500 align-middle'>HOLD</div>;
}

// Конечный автомат для InfoBadge
const initialState = {
    state: 'idle', // idle | loading | pinned
    loaderProgress: 0,
    isPositioned: false,
};

function reducer(state, action) {
    switch (action.type) {
        case 'HOVER':
            if (state.state === 'pinned') return state;
            return { state: 'loading', loaderProgress: 0, isPositioned: false };
        case 'LOADER_PROGRESS':
            return { ...state, loaderProgress: action.progress };
        case 'LOADER_DONE':
            return { state: 'pinned', loaderProgress: 1, isPositioned: state.isPositioned };
        case 'CLICK':
            if (state.state === 'pinned') return state;
            return { state: 'pinned', loaderProgress: 1, isPositioned: state.isPositioned };
        case 'MOUSELEAVE':
            if (state.state === 'pinned') return state;
            return { state: 'idle', loaderProgress: 0, isPositioned: false };
        case 'CLOSE':
            return { state: 'idle', loaderProgress: 0, isPositioned: false };
        case 'POSITIONED':
            return { ...state, isPositioned: true };
        default:
            return state;
    }
}

export default function InfoBadge({ slug, badge: customBadge }) {
    const [fsm, dispatch] = useReducer(reducer, initialState);
    const loaderRaf = useRef(null);
    const loaderStart = useRef(null);
    const badgeRef = useRef(null);
    const floatingRef = useRef(null);
    const hasUpdated = useRef(false);
    const hasPositioned = useRef(false);

    // Получаем конфиг
    const info = getSlugConfig(slug);
    if (!isValidSlug(slug) || !info) {
        return <span className="text-red-500 text-sm">❌ Неизвестный slug: {slug}</span>;
    }
    const colors = COLOR_CLASSES[info.color];

    // Badge content: override from props if provided
    const displayBadge = customBadge !== undefined ? customBadge : info.badge;

    // Offset всегда фиксированный (8px)
    const fixedOffset = 8;

    // Floating UI: anchor всегда badge, offset всегда фиксированный
    const { refs, floatingStyles, update, x, y, context } = useFloating({
        open: fsm.state !== 'idle',
        onOpenChange: (v) => {
            if (!v) dispatch({ type: 'CLOSE' });
        },
        middleware: [offset(fixedOffset), flip(), shift()],
        whileElementsMounted: autoUpdate,
        placement: 'bottom',
    });

    // Floating UI interactions (dismiss по клику вне)
    useDismiss(context, { outsidePress: fsm.state === 'pinned' });
    useRole(context, { role: 'dialog' });

    // Hover: запуск лоадера
    const handleMouseEnter = () => {
        if (fsm.state === 'pinned') return;
        dispatch({ type: 'HOVER' });
    };

    // Mouse leave: если не pinned, сброс
    const handleMouseLeave = () => {
        if (fsm.state !== 'pinned') {
            dispatch({ type: 'MOUSELEAVE' });
            if (loaderRaf.current) cancelAnimationFrame(loaderRaf.current);
        }
    };

    // Click: если не loading, сразу pinned
    const handleClick = (e) => {
        e.stopPropagation();
        if (fsm.state === 'pinned' || fsm.state === 'loading') return;
        dispatch({ type: 'CLICK' });
    };

    // Сброс флагов при переходе в idle
    useEffect(() => {
        if (fsm.state === 'idle') {
            hasUpdated.current = false;
            hasPositioned.current = false;
        }
    }, [fsm.state]);

    // Клик вне меню — закрыть
    useEffect(() => {
        if (fsm.state !== 'pinned') return;
        const handleDocClick = (e) => {
            if (
                floatingRef.current &&
                !floatingRef.current.contains(e.target) &&
                badgeRef.current &&
                !badgeRef.current.contains(e.target)
            ) {
                dispatch({ type: 'CLOSE' });
            }
        };
        document.addEventListener('mousedown', handleDocClick);
        return () => document.removeEventListener('mousedown', handleDocClick);
    }, [fsm.state]);

    // Обновлять позицию модалки при первом открытии
    useEffect(() => {
        if (fsm.state !== 'idle' && update && !hasUpdated.current) {
            hasUpdated.current = true;
            update();
        }
    }, [fsm.state, update]);

    // Fade-in только после первой корректной позиции
    useEffect(() => {
        if (fsm.state === 'idle' || fsm.isPositioned || hasPositioned.current) return;
        if (typeof x === 'number' && typeof y === 'number') {
            hasPositioned.current = true;
            dispatch({ type: 'POSITIONED' });
        }
    }, [fsm.state, fsm.isPositioned, x, y]);

    // Лоадер-анимация запускается только при переходе в loading
    useEffect(() => {
        if (fsm.state !== 'loading') {
            if (loaderRaf.current) cancelAnimationFrame(loaderRaf.current);
            return;
        }
        loaderStart.current = performance.now();
        function animate(now) {
            const elapsed = now - loaderStart.current;
            const progress = Math.min(elapsed / LOADER_DURATION, 1);
            dispatch({ type: 'LOADER_PROGRESS', progress });
            if (progress < 1) {
                loaderRaf.current = requestAnimationFrame(animate);
            } else {
                dispatch({ type: 'LOADER_DONE' });
            }
        }
        loaderRaf.current = requestAnimationFrame(animate);
        return () => {
            if (loaderRaf.current) cancelAnimationFrame(loaderRaf.current);
        };
    }, [fsm.state]);

    // Следим за скроллом/resize: если badge ушёл из viewport — закрываем
    useEffect(() => {
        if (fsm.state === 'idle') return;
        function checkVisibility() {
            if (!badgeRef.current) return;
            const rect = badgeRef.current.getBoundingClientRect();
            const inViewport =
                rect.bottom > 0 &&
                rect.right > 0 &&
                rect.left < window.innerWidth &&
                rect.top < window.innerHeight;
            if (!inViewport) {
                dispatch({ type: 'CLOSE' });
            }
        }
        window.addEventListener('scroll', checkVisibility, true);
        window.addEventListener('resize', checkVisibility, true);
        checkVisibility();
        return () => {
            window.removeEventListener('scroll', checkVisibility, true);
            window.removeEventListener('resize', checkVisibility, true);
        };
    }, [fsm.state]);

    // При размонтировании сбрасываем стейт
    useEffect(() => {
        return () => dispatch({ type: 'CLOSE' });
    }, []);

    // Border highlight при закреплении
    const fadeClass = fsm.isPositioned ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2';

    // Модалка всегда в DOM, но невидима до вычисления позиции
    return (
        <>
            <span
                ref={node => {
                    badgeRef.current = node;
                    refs.setReference(node);
                }}
                className={`inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-[10px] border cursor-pointer transition-all duration-200 select-none ${colors.badge}`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={handleClick}
                tabIndex={0}
            >
                {displayBadge}
            </span>

            <FloatingPortal>
                <div
                    ref={el => {
                        floatingRef.current = el;
                        refs.setFloating(el);
                    }}
                    style={fsm.state !== 'idle' ? floatingStyles : { ...floatingStyles, pointerEvents: 'none' }}
                    className={`markdown relative max-w-sm px-[20px] py-[15px] border-solid !border-[#cccccc] rounded-lg !border-[0.3px] bg-white/95 ${colors.modal} transition-all duration-200 ${fadeClass} pointer-events-auto`}
                    aria-hidden={fsm.state === 'idle'}
                >
                    {/* Loader или крестик в правом верхнем углу */}
                    {fsm.state === 'loading' && (
                        <div className="absolute top-[18px] right-[20px] z-10">
                            <CircularLoader progress={fsm.loaderProgress} />
                        </div>
                    )}

                    {fsm.state === 'pinned' && (
                        <button
                            className="absolute top-2 right-[1rem] text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-lg p-1 rounded transition-colors bg-transparent focus:outline-none cursor-pointer"
                            onClick={() => dispatch({ type: 'CLOSE' })}
                            aria-label="Закрыть"
                            tabIndex={0}
                            type="button"
                        >
                            <i className="fa-solid fa-xmark" />
                        </button>
                    )}
                    <div className="flex items-center gap-[8px] mb-[10px] border-solid border-b border-x-0 border-t-0 border-gray-300 pb-[10px]">
                        {info.icon && (
                            <i className={`fa-solid ${info.icon} text-[12px]`} />
                        )}
                        <p className="font-semibold text-[14px] text-gray-900 m-0">
                            {info.title}
                        </p>
                    </div>
                    <div className="text-[13px] text-gray-700 dark:text-gray-300 leading-relaxed">
                        {getContent(slug)}
                    </div>
                </div>
            </FloatingPortal>
        </>
    );
} 