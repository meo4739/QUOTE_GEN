// 명언 데이터 (quote.json 내용을 직접 포함)
const quotesData = [
    {
        "quote": "성공은 최선을 다한 결과이지, 반드시 승리하는 것이 아니다.",
        "author": "존 우든"
    },
    {
        "quote": "천 마디 말보다 하나의 행동이 더 가치 있다.",
        "author": "마하트마 간디"
    },
    {
        "quote": "실패는 성공으로 가는 가장 빠른 길이다.",
        "author": "코코 샤넬"
    },
    {
        "quote": "오늘 걷지 않으면 내일은 뛰어야 한다.",
        "author": "이소룡"
    },
    {
        "quote": "기회는 준비된 자에게 온다.",
        "author": "토마스 에디슨"
    },
    {
        "quote": "당신이 할 수 있다고 믿든, 할 수 없다고 믿든, 믿는 대로 될 것이다.",
        "author": "헨리 포드"
    },
    {
        "quote": "작은 성취도 반복되면 큰 성공이 된다.",
        "author": "로버트 콜리어"
    },
    {
        "quote": "성공한 사람이 되려고 하지 말고, 가치 있는 사람이 되려고 노력하라.",
        "author": "알베르트 아인슈타인"
    },
    {
        "quote": "가장 어두운 밤도 끝나고 해는 떠오른다.",
        "author": "빅토르 위고"
    },
    {
        "quote": "지금 이 순간이 당신의 삶이다.",
        "author": "오프라 윈프리"
    },
    {
        "quote": "당신이 멈추지 않는 한, 얼마나 느린지는 중요하지 않다.",
        "author": "공자"
    },
    {
        "quote": "위대한 일은 작은 일들이 모여 이루어진다.",
        "author": "빈센트 반 고흐"
    },
    {
        "quote": "두려움은 선택이고, 용기는 행동이다.",
        "author": "존 맥스웰"
    },
    {
        "quote": "당신의 시간이 제한되어 있다는 것을 기억하라. 그러니 다른 사람의 삶을 사느라 낭비하지 마라.",
        "author": "스티브 잡스"
    },
    {
        "quote": "실패는 끝이 아니다. 포기가 끝이다.",
        "author": "마릴린 먼로"
    },
    {
        "quote": "생각은 말이 되고, 말은 행동이 되며, 행동은 습관이 된다.",
        "author": "마하트마 간디"
    },
    {
        "quote": "당신이 보는 세상은 당신이 생각하는 대로 만들어진다.",
        "author": "노먼 빈센트 필"
    },
    {
        "quote": "성공은 열정을 잃지 않고 실패를 거듭할 수 있는 능력이다.",
        "author": "윈스턴 처칠"
    },
    {
        "quote": "당신이 할 수 있다고 생각하든, 할 수 없다고 생각하든, 당신은 옳다.",
        "author": "헨리 포드"
    },
    {
        "quote": "행동은 모든 성공의 기초이다.",
        "author": "파블로 피카소"
    }
];

// 전역 변수
let quotes = quotesData;
let currentQuoteIndex = -1;
let isAnimating = false;

// 퀴즈 게임 변수
let currentMode = 'quote'; // 'quote' 또는 'quiz'
let quizData = {
    currentQuestion: 0,
    totalQuestions: 10,
    score: 0,
    streak: 0,
    correctAnswers: 0,
    questions: []
};

// DOM 요소 선택
const quoteTextElement = document.getElementById('quoteText');
const quoteAuthorElement = document.getElementById('quoteAuthor');
const newQuoteBtn = document.getElementById('newQuoteBtn');

// 모드 관련 DOM 요소
const quoteModeBtn = document.getElementById('quoteMode');
const quizModeBtn = document.getElementById('quizMode');
const quoteSection = document.getElementById('quoteSection');
const quizSection = document.getElementById('quizSection');

// 퀴즈 관련 DOM 요소
const scoreDisplay = document.getElementById('scoreDisplay');
const streakDisplay = document.getElementById('streakDisplay');
const currentQuestionDisplay = document.getElementById('currentQuestion');
const totalQuestionsDisplay = document.getElementById('totalQuestions');
const quizQuoteElement = document.getElementById('quizQuote');
const quizOptionsElement = document.getElementById('quizOptions');
const quizResultElement = document.getElementById('quizResult');
const resultMessageElement = document.getElementById('resultMessage');
const correctAnswerElement = document.getElementById('correctAnswer');
const nextQuizBtn = document.getElementById('nextQuizBtn');
const restartQuizBtn = document.getElementById('restartQuizBtn');
const quizFinalElement = document.getElementById('quizFinal');
const finalScoreElement = document.getElementById('finalScore');
const accuracyElement = document.getElementById('accuracy');
const finalMessageElement = document.getElementById('finalMessage');

// 다크모드 관련 DOM 요소
const darkModeToggle = document.getElementById('darkModeToggle');
const toggleIcon = document.querySelector('.toggle-icon');

// 후원 버튼 관련 요소들
const floatingSupport = document.getElementById('floatingSupport');
const coffeeBtn = document.getElementById('coffeeBtn');

// ========== 다크모드 기능 ==========

// 다크모드 초기화
function initializeDarkMode() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        enableDarkMode();
    }
}

// 다크모드 활성화
function enableDarkMode() {
    document.documentElement.setAttribute('data-theme', 'dark');
    if (toggleIcon) {
        toggleIcon.textContent = '☀️';
    }
    localStorage.setItem('theme', 'dark');
}

// 라이트모드 활성화
function enableLightMode() {
    document.documentElement.setAttribute('data-theme', 'light');
    if (toggleIcon) {
        toggleIcon.textContent = '🌙';
    }
    localStorage.setItem('theme', 'light');
}

// 다크모드 토글
function toggleDarkMode() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    
    if (currentTheme === 'dark') {
        enableLightMode();
        showNotification('🌞 라이트 모드로 전환되었습니다!');
    } else {
        enableDarkMode();
        showNotification('🌙 다크 모드로 전환되었습니다!');
    }
}

// 시스템 다크모드 변경 감지
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
    if (!localStorage.getItem('theme')) {
        if (e.matches) {
            enableDarkMode();
        } else {
            enableLightMode();
        }
    }
});

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', function() {
    // 다크모드 초기화
    initializeDarkMode();
    
    // 다크모드 토글 이벤트 리스너 추가
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', toggleDarkMode);
    }
    
    // 명언 데이터를 직접 사용하므로 첫 번째 명언 바로 표시
    displayRandomQuote();
    
    // 버튼 이벤트 리스너 추가
    newQuoteBtn.addEventListener('click', function() {
        if (!isAnimating) {
            showNewQuote();
        }
    });
    
    // 모드 전환 이벤트 리스너
    quoteModeBtn.addEventListener('click', function() {
        switchMode('quote');
    });
    
    quizModeBtn.addEventListener('click', function() {
        switchMode('quiz');
    });
    
    // 퀴즈 게임 이벤트 리스너
    nextQuizBtn.addEventListener('click', function() {
        nextQuestion();
    });
    
    restartQuizBtn.addEventListener('click', function() {
        initializeQuiz();
    });
    
    // 키보드 이벤트 (스페이스바로 새 명언)
    document.addEventListener('keydown', function(event) {
        if (event.code === 'Space' && !isAnimating && currentMode === 'quote') {
            event.preventDefault();
            showNewQuote();
        }
    });
    
    // 후원 버튼 초기화
    initSupportButtons();
});

// 랜덤 명언 표시
function displayRandomQuote() {
    if (quotes.length === 0) return;
    
    let randomIndex;
    
    // 연속으로 같은 명언이 나오지 않도록 방지
    if (quotes.length > 1) {
        do {
            randomIndex = Math.floor(Math.random() * quotes.length);
        } while (randomIndex === currentQuoteIndex);
    } else {
        randomIndex = 0;
    }
    
    currentQuoteIndex = randomIndex;
    const selectedQuote = quotes[randomIndex];
    
    // 명언 텍스트 업데이트
    quoteTextElement.textContent = selectedQuote.quote;
    quoteAuthorElement.textContent = selectedQuote.author;
    
    // 애니메이션 초기화
    resetAnimation();
}

// 새로운 명언 표시 (애니메이션 효과 포함)
function showNewQuote() {
    if (quotes.length === 0 || isAnimating) return;
    
    isAnimating = true;
    
    // 버튼 비활성화
    newQuoteBtn.disabled = true;
    newQuoteBtn.style.opacity = '0.7';
    
    // 페이드 아웃 효과
    quoteTextElement.style.opacity = '0';
    quoteTextElement.style.transform = 'translateY(-20px)';
    quoteAuthorElement.style.opacity = '0';
    quoteAuthorElement.style.transform = 'translateY(-20px)';
    
    // 새로운 명언 표시
    setTimeout(() => {
        displayRandomQuote();
        
        // 버튼 다시 활성화
        setTimeout(() => {
            newQuoteBtn.disabled = false;
            newQuoteBtn.style.opacity = '1';
            isAnimating = false;
        }, 800);
        
    }, 500);
}

// 애니메이션 초기화
function resetAnimation() {
    // CSS 애니메이션 초기화
    quoteTextElement.style.animation = 'none';
    quoteAuthorElement.style.animation = 'none';
    
    // 강제로 스타일 재적용
    quoteTextElement.offsetHeight;
    quoteAuthorElement.offsetHeight;
    
    // 애니메이션 다시 적용
    quoteTextElement.style.animation = 'fadeInUp 0.8s ease-out forwards';
    quoteAuthorElement.style.animation = 'fadeInUp 0.8s ease-out 0.3s forwards';
}

// 명언 공유 기능 (추후 확장 가능)
function shareQuote() {
    const currentQuote = quotes[currentQuoteIndex];
    if (currentQuote && navigator.share) {
        navigator.share({
            title: '희망의 명언',
            text: `"${currentQuote.quote}" - ${currentQuote.author}`,
            url: window.location.href
        });
    } else {
        // 클립보드에 복사
        const shareText = `"${currentQuote.quote}" - ${currentQuote.author}`;
        navigator.clipboard.writeText(shareText).then(() => {
            showNotification('명언이 클립보드에 복사되었습니다!');
        });
    }
}

// 알림 표시 함수
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        z-index: 1000;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// 동적 스타일 추가
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// 추가 기능: 명언 즐겨찾기 (로컬 스토리지 활용)
function addToFavorites() {
    const currentQuote = quotes[currentQuoteIndex];
    if (!currentQuote) return;
    
    let favorites = JSON.parse(localStorage.getItem('favoriteQuotes') || '[]');
    const isAlreadyFavorite = favorites.some(fav => fav.quote === currentQuote.quote);
    
    if (!isAlreadyFavorite) {
        favorites.push(currentQuote);
        localStorage.setItem('favoriteQuotes', JSON.stringify(favorites));
        showNotification('명언이 즐겨찾기에 추가되었습니다! ⭐');
    } else {
        showNotification('이미 즐겨찾기에 있는 명언입니다.');
    }
}

// 터치 이벤트 지원 (모바일)
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(event) {
    touchStartX = event.changedTouches[0].screenX;
});

document.addEventListener('touchend', function(event) {
    touchEndX = event.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 100;
    const swipeDistance = touchEndX - touchStartX;
    
    if (Math.abs(swipeDistance) > swipeThreshold && !isAnimating) {
        // 좌우 스와이프 시 새로운 명언 표시
        showNewQuote();
    }
}

// 접근성 향상: 포커스 관리
newQuoteBtn.addEventListener('focus', function() {
    this.style.outline = '2px solid #667eea';
});

newQuoteBtn.addEventListener('blur', function() {
    this.style.outline = 'none';
});

// 성능 최적화: 디바운스 함수
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 리사이즈 이벤트 디바운스 적용
window.addEventListener('resize', debounce(() => {
    // 화면 크기 변경 시 레이아웃 재조정
    if (window.innerWidth <= 480) {
        document.querySelector('.container').style.padding = '15px';
    } else if (window.innerWidth <= 768) {
        document.querySelector('.container').style.padding = '20px';
    } else {
        document.querySelector('.container').style.padding = '40px';
    }
}, 250));

// ========== 퀴즈 게임 기능 ==========

// 모드 전환 함수
function switchMode(mode) {
    currentMode = mode;
    
    if (mode === 'quote') {
        // 명언 모드 활성화
        quoteModeBtn.classList.add('active');
        quizModeBtn.classList.remove('active');
        quoteSection.style.display = 'block';
        quizSection.style.display = 'none';
    } else {
        // 퀴즈 모드 활성화
        quizModeBtn.classList.add('active');
        quoteModeBtn.classList.remove('active');
        quoteSection.style.display = 'none';
        quizSection.style.display = 'block';
        
        // 퀴즈 게임 초기화
        initializeQuiz();
    }
}

// 퀴즈 게임 초기화
function initializeQuiz() {
    quizData = {
        currentQuestion: 0,
        totalQuestions: 10,
        score: 0,
        streak: 0,
        correctAnswers: 0,
        questions: []
    };
    
    // 퀴즈 문제들 생성
    generateQuizQuestions();
    
    // 최종 결과 화면 숨기기
    quizFinalElement.style.display = 'none';
    
    // 퀴즈 컨테이너 다시 보이기
    document.querySelector('.quiz-container').style.display = 'block';
    
    // 첫 번째 문제 표시
    displayQuizQuestion();
    
    // 디스플레이 업데이트
    updateQuizDisplay();
}

// 퀴즈 문제들 생성
function generateQuizQuestions() {
    const shuffledQuotes = [...quotes].sort(() => Math.random() - 0.5);
    
    for (let i = 0; i < quizData.totalQuestions; i++) {
        const correctQuote = shuffledQuotes[i];
        const incorrectAuthors = getRandomAuthors(correctQuote.author, 3);
        
        const options = [correctQuote.author, ...incorrectAuthors].sort(() => Math.random() - 0.5);
        
        quizData.questions.push({
            quote: correctQuote.quote,
            correctAnswer: correctQuote.author,
            options: options
        });
    }
}

// 랜덤 오답 선택지 생성
function getRandomAuthors(correctAuthor, count) {
    const availableAuthors = quotes
        .filter(q => q.author !== correctAuthor)
        .map(q => q.author);
    
    // 중복 제거
    const uniqueAuthors = [...new Set(availableAuthors)];
    
    const randomAuthors = [];
    for (let i = 0; i < count && i < uniqueAuthors.length; i++) {
        const randomIndex = Math.floor(Math.random() * uniqueAuthors.length);
        const selectedAuthor = uniqueAuthors.splice(randomIndex, 1)[0];
        randomAuthors.push(selectedAuthor);
    }
    
    return randomAuthors;
}

// 퀴즈 문제 표시
function displayQuizQuestion() {
    const currentQ = quizData.questions[quizData.currentQuestion];
    
    // 문제 표시
    quizQuoteElement.textContent = `"${currentQ.quote}"`;
    
    // 선택지 표시
    quizOptionsElement.innerHTML = '';
    currentQ.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'quiz-option';
        button.textContent = option;
        button.addEventListener('click', () => handleOptionClick(option, button));
        quizOptionsElement.appendChild(button);
    });
    
    // 결과 숨기기
    quizResultElement.style.display = 'none';
    nextQuizBtn.style.display = 'none';
}

// 선택지 클릭 처리
function handleOptionClick(selectedAnswer, clickedButton) {
    const currentQ = quizData.questions[quizData.currentQuestion];
    const isCorrect = selectedAnswer === currentQ.correctAnswer;
    
    // 모든 버튼 비활성화
    const allOptions = quizOptionsElement.querySelectorAll('.quiz-option');
    allOptions.forEach(btn => {
        btn.classList.add('disabled');
        btn.style.pointerEvents = 'none';
        
        if (btn.textContent === currentQ.correctAnswer) {
            btn.classList.add('correct');
        } else if (btn === clickedButton && !isCorrect) {
            btn.classList.add('incorrect');
        }
    });
    
    // 정답 체크
    checkAnswer(isCorrect);
    
    // 결과 표시
    showQuizResult(isCorrect, currentQ.correctAnswer);
    
    // 다음 문제 버튼 표시
    setTimeout(() => {
        nextQuizBtn.style.display = 'inline-block';
    }, 1000);
}

// 정답 체크
function checkAnswer(isCorrect) {
    if (isCorrect) {
        quizData.score += 10;
        quizData.streak += 1;
        quizData.correctAnswers += 1;
        
        // 연속 정답 보너스
        if (quizData.streak >= 3) {
            quizData.score += 5;
        }
    } else {
        quizData.streak = 0;
    }
    
    updateQuizDisplay();
}

// 퀴즈 결과 표시
function showQuizResult(isCorrect, correctAnswer) {
    quizResultElement.style.display = 'block';
    
    if (isCorrect) {
        resultMessageElement.textContent = '🎉 정답입니다!';
        resultMessageElement.className = 'result-message correct';
        
        if (quizData.streak >= 3) {
            correctAnswerElement.textContent = `연속 정답 보너스! (+5점)`;
        } else {
            correctAnswerElement.textContent = `훌륭해요! (+10점)`;
        }
    } else {
        resultMessageElement.textContent = '❌ 틀렸습니다';
        resultMessageElement.className = 'result-message incorrect';
        correctAnswerElement.textContent = `정답: ${correctAnswer}`;
    }
}

// 다음 문제 진행
function nextQuestion() {
    quizData.currentQuestion++;
    
    if (quizData.currentQuestion >= quizData.totalQuestions) {
        finishQuiz();
    } else {
        displayQuizQuestion();
        updateQuizDisplay();
    }
}

// 퀴즈 완료 처리
function finishQuiz() {
    // 퀴즈 컨테이너 숨기기
    document.querySelector('.quiz-container').style.display = 'none';
    nextQuizBtn.style.display = 'none';
    
    // 최종 결과 표시
    const accuracy = Math.round((quizData.correctAnswers / quizData.totalQuestions) * 100);
    
    finalScoreElement.textContent = quizData.score;
    accuracyElement.textContent = accuracy;
    
    // 점수에 따른 메시지
    let message = '';
    if (accuracy >= 90) {
        message = '🏆 완벽해요! 명언 박사시네요!';
    } else if (accuracy >= 80) {
        message = '🌟 훌륭해요! 명언에 대해 잘 아시는군요!';
    } else if (accuracy >= 70) {
        message = '👍 좋아요! 조금 더 공부하면 완벽할 거예요!';
    } else if (accuracy >= 60) {
        message = '💪 괜찮아요! 다시 한 번 도전해보세요!';
    } else {
        message = '📚 명언들을 더 알아보고 다시 도전해보세요!';
    }
    
    finalMessageElement.textContent = message;
    quizFinalElement.style.display = 'block';
    
    // 로컬 스토리지에 최고 점수 저장
    const bestScore = localStorage.getItem('quizBestScore') || 0;
    if (quizData.score > bestScore) {
        localStorage.setItem('quizBestScore', quizData.score);
        showNotification('🎉 새로운 최고 점수를 달성했습니다!');
    }
}

// 퀴즈 디스플레이 업데이트
function updateQuizDisplay() {
    scoreDisplay.textContent = quizData.score;
    streakDisplay.textContent = quizData.streak;
    currentQuestionDisplay.textContent = quizData.currentQuestion + 1;
    totalQuestionsDisplay.textContent = quizData.totalQuestions;
}

// 후원 버튼 관련 함수들
function initSupportButtons() {
    // 스크롤 이벤트로 플로팅 버튼 표시/숨김
    let lastScrollY = window.scrollY;
    
    function handleScroll() {
        const currentScrollY = window.scrollY;
        const isScrollingDown = currentScrollY > lastScrollY;
        const scrollThreshold = 100; // 100px 이상 스크롤했을 때
        
        if (currentScrollY > scrollThreshold) {
            floatingSupport.style.opacity = '1';
            floatingSupport.style.visibility = 'visible';
            floatingSupport.style.transform = `translateY(${isScrollingDown ? '0' : '-10px'})`;
        } else {
            floatingSupport.style.opacity = '0';
            floatingSupport.style.visibility = 'hidden';
            floatingSupport.style.transform = 'translateY(10px)';
        }
        
        lastScrollY = currentScrollY;
    }
    
    // 디바운스된 스크롤 핸들러
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(handleScroll, 10);
    });
    
    // 초기 상태 설정
    floatingSupport.style.opacity = '0';
    floatingSupport.style.visibility = 'hidden';
    floatingSupport.style.transition = 'all 0.3s ease';
    
    // 후원 버튼 클릭 이벤트
    function handleSupportClick(event) {
        const button = event.currentTarget;
        
        // 클릭 애니메이션
        button.style.transform = 'scale(0.95)';
        
        // 감사 메시지 (선택적)
        const originalText = button.querySelector('.coffee-text')?.textContent;
        if (originalText) {
            button.querySelector('.coffee-text').textContent = '감사합니다! 💝';
            setTimeout(() => {
                button.querySelector('.coffee-text').textContent = originalText;
            }, 2000);
        }
        
        setTimeout(() => {
            button.style.transform = '';
        }, 150);
        
        // 애널리틱스나 추적을 위한 이벤트 (선택적)
        console.log('후원 버튼 클릭됨');
    }
    
    // 메인 후원 버튼과 플로팅 버튼에 이벤트 리스너 추가
    if (coffeeBtn) {
        coffeeBtn.addEventListener('click', handleSupportClick);
    }
    
    const floatingCoffeeBtn = document.querySelector('.floating-coffee-btn');
    if (floatingCoffeeBtn) {
        floatingCoffeeBtn.addEventListener('click', handleSupportClick);
    }
    
    // 호버 효과 개선
    [coffeeBtn, floatingCoffeeBtn].forEach(btn => {
        if (btn) {
            btn.addEventListener('mouseenter', () => {
                btn.style.animation = 'none';
                void btn.offsetHeight; // 리플로우 강제
                btn.style.animation = null;
            });
        }
    });
} 