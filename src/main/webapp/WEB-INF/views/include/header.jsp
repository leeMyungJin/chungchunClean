<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="keywords" content="청춘클린">
<meta name="description" content="청춘클린">
<meta property="og:type" content="website">
<meta property="og:title" content="청춘클린">
<meta property="og:description" content="청춘클린">
<title>청춘클린</title>
<link rel="shortcut icon" type="image/x-icon" href="image/favico.ico">

<script src="../js/include/common.js"></script>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://code.jquery.com/ui/1.8.18/jquery-ui.min.js"></script>
<link rel="stylesheet" href="https://code.jquery.com/ui/1.8.18/themes/base/jquery-ui.css" type="text/css" /> 
<link rel="icon" href="image/icon_favicon.ico" type="image/ico"> 
<link rel="shortcut icon" href="image/icon_favicon.ico"/>

<!-- wijmo 그리드 -->
<!-- Wijmo 레퍼런스 (필수) -->
<link href="../wijmo/Dist/styles/wijmo.min.css" rel="stylesheet" />
<!-- 
    wijmo.min.css 대신에 아래와 같이 사용자 정의 테마 사용가능
    <link href="styles/themes/wijmo.theme.modern.min.css" rel="stylesheet"/>
-->

<!-- Wijmo 컨트롤 (옵션, 필요한 컨트롤 만 추가) -->
<script src="../wijmo/Dist/controls/wijmo.min.js"></script>
<script src="../wijmo/Dist/controls/wijmo.input.min.js"></script>
<script src="../wijmo/Dist/controls/wijmo.grid.min.js"></script>
<script src="../wijmo/Dist/controls/wijmo.grid.filter.min.js"></script>
<script src="../wijmo/Dist/controls/wijmo.grid.sheet.min.js"></script>
<script src="../wijmo/Dist/controls/wijmo.xlsx.min.js"></script>
<script src="../wijmo/Dist/controls/wijmo.grid.xlsx.min.js"></script>
<script src="../wijmo/Dist/controls/wijmo.grid.cellmaker.min.js"></script>
<script src="../wijmo/Dist/controls/wijmo.chart.min.js"></script>
<script src="../wijmo/Dist/controls/wijmo.input.min.js"></script>
<script src="../wijmo/Dist/controls/wijmo.gauge.min.js"></script>
<script src="../wijmo/Dist/controls/wijmo.grid.xlsx.min.js"></script>
<script src="../wijmo/Dist/controls/wijmo.grid.selector.min.js"></script>
<script src="../wijmo/Dist/controls/wijmo.grid.search.min.js"></script>
<script src="../wijmo/Dist/controls/wijmo.grid.grouppanel.min.js"></script>
<script src="../wijmo/Dist/controls/wijmo.barcode.min.js"></script>
<script src="../wijmo/Dist/controls/wijmo.barcode.common.min.js"></script>
<script src="../wijmo/Dist/jszip.min.js"></script>

<!-- Wijmo custom culture (옵션, 원하는 문화권을 추가) -->
<script src="../wijmo/Dist/controls//cultures/wijmo.culture.ko.min.js"></script>

<!-- Wijmo 배포라이선스키 적용 (배포 시 필요) -->
<script>
  wijmo.setLicenseKey('chungchunclean.co.kr,566366963814356#B0IZhsnOiwmbBJye0ICRiwiI34zdvxmY5lGT4lGcJ9Uc9JFNktUMw9WTvNlcCVjdxNDaxFzZxc6YmJnULRmSGxUQk3kMCJGWT5UNDpGamxEeFZGcVNmcJdXY4E6U7VHMCdTd4gDeldXVZR7TMdEaxJ5NxJGUFhFTMtkUrw6StxUMPpkYSJVU8MDM7QkduJ6YSN4QwdVRHpHNmhnWKh7VrI4TwdEThhjRGtiUWRDS7cmbKNjQ4ZmZPtSY0xWauB5RPZHbhJkMihmNuZ4YzdkUzlEeOVVYnh4U6dFU5llMj3yYLtEaSNHTxE4Mkl5dXNzUDVUOBlXa8JXRxlWNvg5K9MzZu3USi3WOvgHTwYTbItCZItEM4Rkd6FUN68EaqdERXtUYhBVcysUbRNGVv4GarZ6djJ6aB3kNhxUUhdlQ92ESFB5NLRTM9gjUzIVT4MFU6QleEtCbuxkdTtyYOpUS78URz2WTmFnNpxmI0IyUiwiIzIDO9EEM9IjI0ICSiwyM4gzM9kTOxgTM0IicfJye35XX3JSSwIjUiojIDJCLi86bpNnblRHeFBCI4VWZoNFelxmRg2Wbql6ViojIOJyes4nI5kkTRJiOiMkIsIibvl6cuVGd8VEIgIXZ7VWaWRncvBXZSBybtpWaXJiOi8kI1xSfis4N8gkI0IyQiwiIu3Waz9WZ4hXRgAydvJVa4xWdNBybtpWaXJiOi8kI1xSfiQjR6QkI0IyQiwiIu3Waz9WZ4hXRgACUBx4TgAybtpWaXJiOi8kI1xSfiMzQwIkI0IyQiwiIlJ7bDBybtpWaXJiOi8kI1xSfiUFO7EkI0IyQiwiIu3Waz9WZ4hXRgACdyFGaDxWYpNmbh9WaGBybtpWaXJiOi8kI1tlOiQmcQJCLiczMwEzNwAiMycDMxIDMyIiOiQncDJCLiI7au26Yu8WYlx6YuVHajdmb5h6YiojIz5GRiwiIFeJ1ImZ1iojIh94QiwiI6UzM4EDOzYTO6YzM6YTNiojIklkIs4XXbpjInxmZiwiIxYXMyAjMiojIyVmdiwSZzxWYmpYIJN');
</script>

<link rel="stylesheet" href="../css/reset.css">
<link rel="stylesheet" href="../css/common.css">
<link rel="stylesheet" href="../css/gridCall.css">