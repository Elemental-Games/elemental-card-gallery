import { kickstarterConfig } from '@/config/kickstarter';
import { motion } from 'framer-motion';
import { Users, Target } from 'lucide-react';

const formatCurrency = (amount) => {
  if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`;
  if (amount >= 1000) return `$${(amount / 1000).toFixed(amount % 1000 === 0 ? 0 : 1)}K`;
  return `$${amount.toLocaleString()}`;
};

const KickstarterProgress = ({ compact = false, showStretchGoal = true, className = '' }) => {
  const { goal, raised, backers, stretchGoals } = kickstarterConfig;
  const percentage = Math.min((raised / goal) * 100, 100);
  const isFunded = raised >= goal;

  const nextStretchGoal = stretchGoals.find((sg) => !sg.unlocked && raised < sg.amount);
  const nextProgress = nextStretchGoal
    ? Math.min((raised / nextStretchGoal.amount) * 100, 100)
    : 100;

  if (compact) {
    return (
      <div className={`text-center ${className}`}>
        <div className="flex items-center justify-center gap-4 mb-2">
          <span className="text-2xl font-bold text-green-400">{formatCurrency(raised)}</span>
          <span className="text-purple-300">of {formatCurrency(goal)} goal</span>
          {backers > 0 && (
            <span className="flex items-center gap-1 text-purple-300">
              <Users className="w-4 h-4" />
              {backers.toLocaleString()} backers
            </span>
          )}
        </div>
        <div className="w-full bg-green-900/40 rounded-full h-3 border border-green-500/30">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-green-500 to-yellow-400"
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full max-w-2xl mx-auto ${className}`}>
      <div className="bg-gradient-to-br from-green-950/60 to-emerald-950/60 border border-green-500/40 rounded-xl p-6 shadow-lg shadow-green-500/10">
        {/* Funding amount */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-2">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl lg:text-4xl font-bold text-green-400">
              {formatCurrency(raised)}
            </span>
            <span className="text-lg text-green-200/70">
              pledged of {formatCurrency(goal)} goal
            </span>
          </div>
          {backers > 0 && (
            <div className="flex items-center gap-2 text-green-200/70">
              <Users className="w-5 h-5 text-green-400" />
              <span className="text-lg font-semibold text-green-300">
                {backers.toLocaleString()}
              </span>
              <span>backers</span>
            </div>
          )}
        </div>

        {/* Progress bar */}
        <div className="w-full bg-green-900/40 rounded-full h-4 border border-green-500/30 mb-3">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-green-500 to-yellow-400 relative"
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          >
            {percentage > 5 && (
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-bold text-green-900">
                {Math.round(percentage)}%
              </span>
            )}
          </motion.div>
        </div>

        {/* Status line */}
        <div className="text-center mb-2">
          {isFunded ? (
            <span className="text-green-400 font-semibold">
              Funded! Now working toward stretch goals
            </span>
          ) : (
            <span className="text-green-200/80 text-sm">
              {formatCurrency(goal - raised)} to go — every pledge helps!
            </span>
          )}
        </div>

        {/* Next stretch goal */}
        {showStretchGoal && nextStretchGoal && (
          <div className="mt-4 pt-4 border-t border-green-500/20">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-yellow-400 font-semibold uppercase tracking-wide">
                Next Stretch Goal
              </span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-green-200 text-sm">{nextStretchGoal.label}</span>
              <span className="text-green-400 font-bold text-sm">
                {formatCurrency(nextStretchGoal.amount)}
              </span>
            </div>
            <div className="w-full bg-green-900/40 rounded-full h-2 border border-yellow-500/20">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-yellow-500 to-yellow-300"
                initial={{ width: 0 }}
                animate={{ width: `${nextProgress}%` }}
                transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default KickstarterProgress;
