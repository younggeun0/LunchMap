# 점심 지도

회사에서 사용하는 기술 연습용 토이 프로젝트
- 방문한 점포 모델을 추가하고 그 점포에 대한 후기를 작성할 수 있는 기능 제공

### 요구사항 명세

- 점포 검색 + 등록 기능
    - 점포
        - 상호명
        - 위치
        - 평균 평점
- 팀원들이 먹고서 한줄평과 평점을 줄 수 있는 기능
    - 유저
        - 이름
    - 평점
        - 작성자
        - 작성일
        - 평점
        - 코멘트

### 기술

- django, django rest framework(drf), sqlite
- nextjs, reactjs


### 설치

```bash
# backend
# venv 설정
python3 -m venv .venv

# django, drf 설치
pip install django
pip install djangorestframework

python3 manage.py migrate
```


