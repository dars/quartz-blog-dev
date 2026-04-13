## Swift 套件管理器和 UIScene
從 CocoaPods 到 Swift Package Manager 的過渡仍在繼續。我們強烈鼓勵[外掛程式作者](https://docs.flutter.dev/packages-and-plugins/swift-package-manager/for-plugin-authors)採用 Swift Package Manager，因為它現在是 Apple 生態系統的標準。此外，為了確保與未來 iOS 版本的兼容性，Flutter 現在預設完全支援 [UIScene 生命週期](https://github.com/flutter/flutter/pull/178328)
對於我還在習慣用 Cocoapods 的人來說，的確是應該要花點時間玩玩 SPM 了

## Android 級插件 (AGP) 9 和 Kotlin DSL
繼續與現代 Android 標準保持一致。隨著 Android Gradle Plugin (AGP) 9 的發布，Flutter 官方正在努力支持新的嚴格要求並提供有關如何駕馭這些要求的指導
**因為目前尚未支援 AGP9，官方不建議升級移轉**

現在可以在 pubspec.yaml 中指定資產應捆綁到哪些平台。這允許進行最佳化，例如從行動建置中排除繁重的桌面資源，從而顯著減小應用程式的大小
```yaml
flutter:  
  assets:  
    - path: assets/logo.png  
    - path: assets/web_worker.js  
      platforms: [web]  
    - path: assets/desktop_icon.png  
      platforms: [windows, linux, macos]
```

## Fragment Shader 改進
針對開發者回饋，做了兩項重要強化：
- **同步圖像解碼**：新增 `decodeImageFromPixelsSync`，可在同一 frame 內生成 texture 並作為 sampler，消除之前 lag 一幀的問題
- **高位元率 Texture 支援**：支援最高 128-bit float，可用於 GPU 加速的照片濾鏡與 SDF

## Widget Previews（實驗性）
兩項重要改進：
- **Flutter Inspector 整合**：Widget Preview 環境現在內嵌 Flutter Inspector，可直接審查 layout 與 widget 狀態
- **dart:ffi 依賴支援**：預覽環境現在可處理含有 `dart:ffi` / `dart:io` 的 widget，不再導致編譯錯誤（但不支援實際呼叫這些 API） [flutter](https://blog.flutter.dev/whats-new-in-flutter-3-41-302ec140e632)

## 框架精緻化

**iOS 視覺改善**
Impeller 渲染引擎改善了 `BackdropFilter` 邊緣色彩滲漏問題（bounded blur style），並為 `CupertinoSheet` 新增原生風格的拖曳把手（`showDragHandle` 屬性）
![[1_ocj9sgfhhYAYFlVIqPxZmA.webp]]

**Add-to-App：Content-Sized Views**
嵌入至原生 App 的 Flutter View 現在可依內容自動調整尺寸，不再需要原生端預先固定大小。iOS 設定 `FlutterViewController.isAutoResizable = true`；Android 則在 Manifest 中啟用並設定 `content_wrap`  [flutter](https://blog.flutter.dev/whats-new-in-flutter-3-41-302ec140e632)

**Navigation & Scrolling**
三項改進：
- 新增 `Navigator.popUntilWithResult`，可一次 pop 多個頁面並回傳值至目標 route
- `StretchingOverscrollIndicator` 改用 Android 12 移植的模擬演算法，overscroll 效果更自然
- 修正 `NestedScrollView` 與 `SliverMainAxisGroup` 的 pinned header 重疊問題  [flutter](https://blog.flutter.dev/whats-new-in-flutter-3-41-302ec140e632)

## 無障礙功能 (Accessibility)
新增：
- `CircularProgressIndicator` / `LinearProgressIndicator` 的原生無障礙支援，讓輔助技術能播報進度
- 支援 Web 用戶的文字間距覆蓋設定
- `flutter_test` 新增 `isSemantics`、`accessibilityAnnouncement` matcher  [flutter](https://blog.flutter.dev/whats-new-in-flutter-3-41-302ec140e632)

## Material & Animation
社群貢獻者帶來 `RepeatingAnimationBuilder`，以宣告式方式建立持續動畫（載入指示、脈動按鈕、閃爍佔位元素）。另外 `CarouselView` 新增 `.builder` 建構子，`DropdownMenuFormField` 支援自訂 `errorBuilder` [flutter](https://blog.flutter.dev/whats-new-in-flutter-3-41-302ec140e632)

## 桌面平台（Canonical 合作）
實驗性新增：popup window、tooltip window API，以及 Linux / macOS / Windows 跨平台的 dialog window 支援；同時提供多視窗 App 的測試 API。Flutter Linux 現預設啟用 merged threads，提升效能  [flutter](https://blog.flutter.dev/whats-new-in-flutter-3-41-302ec140e632)

## DevTools
DevTools 現以 dart2wasm 編譯，效能提升（仍可在設定中切回 dart2js）；Dart Tooling Daemon 斷線後現在會自動重連，改善電腦睡眠喚醒後的體驗