import React, {useState} from 'react';
import {AnimatePresence, motion, useReducedMotion} from 'motion/react';
const steps = ['/onboarding', '/onboarding/2', '/onboarding/3'];
export default function OnboardingFrame({ui, art, content, chrome}) {
 const reduced = useReducedMotion();
 const index = steps.indexOf(ui.page);
 const [navigation, setNavigation] = useState({index, direction: 1});
 const direction = index === navigation.index ? navigation.direction : index > navigation.index ? 1 : -1;
 if (index !== navigation.index) setNavigation({index, direction});
 const transition = {duration: reduced ? 0 : .38, ease: [.22, 1, .36, 1]};
 const slide = {
  enter: d => ({x: reduced ? 0 : d * 375, opacity: 1}),
  center: {x: 0, opacity: 1},
  exit: d => ({x: reduced ? 0 : -d * 375, opacity: 1}),
 };
 return <div className="auth-artboard onboarding-frame">
  {chrome}
  <AnimatePresence initial={false} custom={direction}>
   <motion.div key={ui.page} custom={direction} className="onboarding-content" variants={slide} initial="enter" animate="center" exit="exit" transition={transition}>
    {art}{content}
   </motion.div>
  </AnimatePresence>
  {index > 0 && <button className="onboarding-back" aria-label="Back" onClick={() => ui.go(steps[index - 1])}>
   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m14 6-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
  </button>}
  <div className="onboarding-dots" aria-label="Onboarding steps">
   <AnimatePresence initial={false} custom={direction}>
    <motion.div key={index} className="onboarding-dot-track" custom={direction} initial={{x: reduced ? 0 : direction * 40, opacity: 0}} animate={{x: 0, opacity: 1}} exit={{x: reduced ? 0 : -direction * 40, opacity: 0}} transition={transition}>
     {steps.map((path, i) => <button key={path} type="button" aria-label={'Onboarding step ' + (i + 1)} aria-current={i === index ? 'step' : undefined} onClick={() => ui.go(path)} style={{width: i === index ? 36 : 14, backgroundColor: i === index ? '#f6905b' : i === 2 ? '#e2d3e8' : '#addedb'}}/>)}
    </motion.div>
   </AnimatePresence>
  </div>
  <button className="onboarding-next" onClick={() => ui.go(steps[index + 1] || '/signup')}>Next</button>
 </div>;
}
